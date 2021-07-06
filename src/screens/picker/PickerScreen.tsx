import * as React from 'react';
import { StyleSheet, SafeAreaView, View, SectionList, Keyboard } from 'react-native';

import { PDText } from '~/components/PDText';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { PickerItem } from './PickerItem';
import { PickerRow } from './PickerRow';
import { dispatch } from '~/redux/AppState';
import { updatePickerState } from '~/redux/picker/Actions';
import { PickerState, PickerKey } from '~/redux/picker/PickerState';
import { PickerSlider } from './PickerSlider';
import { Haptic } from '~/services/HapticService';
import { BoringButton } from '~/components/buttons/BoringButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CloseButton } from '~/components/buttons/CloseButton';
import { PDNavParams } from '~/navigator/shared';

export interface PDPickerRouteProps {
    title: string;
    subtitle: string;
    /// If we're selecting from a list, items must be defined.
    items?: PickerItem[];
    /// Otherwise, we'll assume we're moving a slider.
    pickerKey: PickerKey;
    prevSelection?: string;
}

interface PickerScreenProps {
    navigation: StackNavigationProp<PDNavParams, 'PickerScreen'>;
    route: RouteProp<PDNavParams, 'PickerScreen'>;
}

export const PickerScreen: React.FunctionComponent<PickerScreenProps> = (props: PickerScreenProps) => {
    const { title, subtitle, items, pickerKey, prevSelection } = props.route.params;
    const { goBack } = useNavigation();

    // This state only applies to the slider (yuck)
    const [textValue, setTextValue] = React.useState(props.route.params.prevSelection || '1');
    // Reminder: this only gets set to `textValue` by this line on the first render
    const [sliderValue, updateSliderValue] = React.useState(parseInt(textValue, 10));
    const [isSliding, setIsSliding] = React.useState(false);

    const handleButtonPress = (value: string) => {
        const pickerState: PickerState = {
            key: pickerKey,
            value,
        };
        dispatch(updatePickerState(pickerState));
        goBack();
    };

    const handleClosePressed = () => {
        Haptic.light();
        // clear the picker state:
        dispatch(updatePickerState({ key: 'nothing', value: null }));
        goBack();
    };

    const getContent = (): JSX.Element => {
        /// If items are provided, show a listview
        if (items !== undefined) {
            return (
                <SectionList
                    style={ { flex: 1, paddingTop: 20 } }
                    renderItem={ ({ item }) => (
                        <PickerRow item={ item } onSelect={ handleButtonPress } isSelected={ prevSelection === item.value } />
                    ) }
                    sections={ [{ data: items }] }
                    keyExtractor={ (item) => item.value }
                    overScrollMode={ 'always' }
                />
            );
        }
        /// Otherwise, show a slider from 0 - 100%:

        const handleSliderChanged = (newValue: number) => {
            console.log('newValue: ', newValue);
            if (newValue !== sliderValue) {
                Haptic.bumpyGlide();
                updateSliderValue(newValue);
                setTextValue(newValue.toFixed(0));
            }
        };

        const handleTextboxUpdated = (newValue: string) => {
            console.log('booooooga');
            setTextValue(newValue);
        };

        const handleTextboxDismissed = (newValue: string) => {
            // Range enforcer:
            let finalValue = newValue ? parseInt(newValue, 10) : 1;
            finalValue = Math.max(Math.min(finalValue, 100), 1);

            setTextValue(finalValue.toFixed(0));
        };

        const handleSavePressed = () => {
            Haptic.medium();
            Keyboard.dismiss();
            const pickerState: PickerState = {
                key: pickerKey,
                value: textValue,
            };
            dispatch(updatePickerState(pickerState));
            goBack();
        };

        return (
            <View style={ { flex: 1, display: 'flex', justifyContent: 'flex-start' } }>
                <KeyboardAwareScrollView style={ { flex: 1, backgroundColor: '#F4F7FF' } } scrollEnabled={ !isSliding }>
                    <PickerSlider
                        sliderState={ { value: textValue } }
                        onSlidingStart={ () => {
                            setIsSliding(true);
                        } }
                        onSlidingComplete={ () => {
                            setIsSliding(false);
                        } }
                        onSliderUpdatedValue={ handleSliderChanged }
                        onTextboxUpdated={ handleTextboxUpdated }
                        onTextboxFinished={ handleTextboxDismissed }
                    />
                </KeyboardAwareScrollView>
                <View style={ { backgroundColor: 'white' } }>
                    <BoringButton containerStyles={ styles.saveButton } onPress={ handleSavePressed } title="Save" />
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={ { flex: 1, backgroundColor: '#FFFFFF' } }>
            <View style={ styles.container }>
                <View style={ styles.header }>
                    <View style={ styles.headerLeft }>
                        <PDText type="default" style={ [styles.title, styles.titleTop] }>
                            {title}
                        </PDText>
                        <PDText type="default" style={ [styles.title, styles.titleBottom] }>
                            {subtitle}
                        </PDText>
                    </View>
                    <CloseButton onPress={ handleClosePressed } containerStyle={ styles.closeButton } />
                </View>
                {getContent()}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
        marginTop: 24,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
    },
    headerLeft: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    title: {
        marginLeft: 12,
        fontSize: 28,
        fontWeight: 'bold',
    },
    titleBottom: {
        color: '#1E6BFF',
        marginBottom: 12,
    },
    titleTop: {
        color: '#000',
        marginBottom: -3,
    },
    closeButton: {
        marginLeft: 'auto',
        marginRight: 16,
    },
    saveButton: {
        alignSelf: 'stretch',
        backgroundColor: '#1E6BFF',
        margin: 12,
        marginBottom: 24,
    },
});
