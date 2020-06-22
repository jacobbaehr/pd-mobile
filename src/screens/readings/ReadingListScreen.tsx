import * as React from 'react';
import { View, StyleSheet, SectionListData, SafeAreaView, LayoutAnimation, InputAccessoryView, Keyboard } from 'react-native';
import { KeyboardAwareSectionList } from 'react-native-keyboard-aware-scroll-view';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';

import { PDNavStackParamList } from '~/navigator/Navigators';
import { AppState, dispatch } from '~/redux/AppState';
import { Pool } from '~/models/Pool';

import { ReadingListItem, ReadingState } from './ReadingListItem';
import { ReadingListHeader } from './ReadingListHeader';
import { RecipeKey } from '~/models/recipe/RecipeKey';
import { useNavigation } from '@react-navigation/native';
import { Haptic } from '~/services/HapticService';
import { Util } from '~/services/Util';
import { BoringButton } from '~/components/buttons/BoringButton';
import { ReadingListFooter } from './ReadingListFooter';
import { recordInput, clearReadings } from '~/redux/readingEntries/Actions';
import { useRecipeHook } from '../poolList/hooks/RealmPoolHook';

interface ReadingListScreenProps {
    navigation: StackNavigationProp<PDNavStackParamList, 'ReadingList'>;
    recipeKey: RecipeKey;
    pool: Pool;
}

const mapStateToProps = (state: AppState, ownProps: ReadingListScreenProps): ReadingListScreenProps => {
    return {
        navigation: ownProps.navigation,
        pool: state.selectedPool!,
        recipeKey: state.selectedPool!.recipeKey!
    };
};

const ReadingListScreenComponent: React.FunctionComponent<ReadingListScreenProps> = (props) => {

    const [isSliding, setIsSliding] = React.useState(false);
    const [readingStates, setReadingStates] = React.useState<ReadingState[]>([]);
    const recipe = useRecipeHook(props.recipeKey);

    const { setOptions, navigate, goBack } = useNavigation<StackNavigationProp<PDNavStackParamList, 'ReadingList'>>();
    const keyboardAccessoryViewId = 'wowThisIsSomeReallyUniqueTextReadingListKeyboard';

    React.useEffect(() => {
        setOptions({ gestureEnabled: false });
        if (recipe) {
            const initialReadingStates = recipe.readings.map(r => ({
                reading: r,
                value: r.defaultValue.toFixed(r.decimalPlaces),
                isOn: false
            }));

            setReadingStates(initialReadingStates);
        }
    }, [recipe]);

    const handleCalculatePressed = (): void => {
        dispatch(clearReadings());
        readingStates.forEach(rs => {
            if (rs.isOn && (rs.value !== undefined)) {
                dispatch(recordInput(rs.reading, parseFloat(rs.value)));
            }
        });
        navigate('TreatmentList');
    };

    const handleBackPressed = (): void => {
        goBack();
    };

    const handleSlidingStopped = (varName: string) => {
        setIsSliding(false);
        let isChanged = false;
        const rs = Util.deepCopy(readingStates);
        rs.forEach((r) => {
            if (r.reading.var === varName && !r.isOn) {
                isChanged = true;
                r.isOn = true;
            }
        });
        if (isChanged) {
            // Animate the progress bar change here:
            const springAnimationProperties = {
                type: LayoutAnimation.Types.keyboard,
                property: LayoutAnimation.Properties.scaleXY,
            };
            const animationConfig = {
                duration: 250, // how long the animation will take	
                create: undefined,
                update: springAnimationProperties,
                delete: undefined
            };
            LayoutAnimation.configureNext(animationConfig);
            setReadingStates(rs);
        }
    };

    const handleSlidingStarted = () => {
        setIsSliding(true);
    };

    const handleSliderUpdatedValue = (varName: string, value: number) => {
        const rs = Util.deepCopy(readingStates);
        let isChanged = false;
        rs.forEach((r) => {
            if (r.reading.var === varName) {
                const newValue = value.toFixed(r.reading.decimalPlaces);
                if (newValue !== r.value) {
                    isChanged = true;
                    r.value = newValue;
                }
            }
        });
        if (isChanged) {
            setReadingStates(rs);
            Haptic.bumpyGlide();
        }
    };

    const handleTextboxUpdated = (varName: string, text: string) => {
        const rs = Util.deepCopy(readingStates);
        rs.forEach((r) => {
            if (r.reading.var === varName) {
                r.value = text;
            }
        });
        setReadingStates(rs);
    };

    const handleTextboxDismissed = (varName: string, text: string) => {
        const rs = Util.deepCopy(readingStates);
        rs.forEach((r) => {
            if (r.reading.var === varName) {
                r.value = text;
                r.isOn = text.length > 0;
            }
        });
        setReadingStates(rs);
    };

    const handleIconPressed = (varName: string) => {
        Haptic.light();
        const rs = Util.deepCopy(readingStates);
        rs.forEach((r) => {
            if (r.reading.var === varName) {
                r.isOn = !r.isOn;
                if (r.isOn && !r.value) {
                    r.value = r.reading.defaultValue.toFixed(r.reading.decimalPlaces);
                }
            }
        });
        // Animate the progress bar change here:
        const springAnimationProperties = {
            type: LayoutAnimation.Types.keyboard,
            property: LayoutAnimation.Properties.scaleXY,
        };
        const animationConfig = {
            duration: 250, // how long the animation will take	
            create: undefined,
            update: springAnimationProperties,
            delete: undefined
        };
        LayoutAnimation.configureNext(animationConfig);
        setReadingStates(rs);
    }

    // Really, we shouldn't be using a sectionlist, because there's only 1 section
    let sections: SectionListData<ReadingState>[] = [{ data: readingStates }];

    let progress = 0;
    if (recipe) {
        const completed = readingStates.filter(r => r.isOn);
        progress = (readingStates.length == 0)
            ? 1
            : (completed.length / readingStates.length);
    }

    return (
        <SafeAreaView style={ { flex: 1, backgroundColor: 'white' } }>
            <View style={ styles.container }>
                <ReadingListHeader handleBackPress={ handleBackPressed } pool={ props.pool } percentComplete={ progress } />
                <KeyboardAwareSectionList
                    style={ styles.sectionList }
                    scrollEnabled={ !isSliding }
                    keyboardDismissMode={ 'interactive' }
                    keyboardShouldPersistTaps={ 'handled' }
                    renderItem={ ({ item }) => <ReadingListItem
                        readingState={ item }
                        onTextboxUpdated={ handleTextboxUpdated }
                        onTextboxFinished={ handleTextboxDismissed }
                        onSlidingStart={ handleSlidingStarted }
                        onSlidingComplete={ handleSlidingStopped }
                        onSliderUpdatedValue={ handleSliderUpdatedValue }
                        handleIconPressed={ handleIconPressed }
                        inputAccessoryId={ keyboardAccessoryViewId } /> }
                    sections={ sections }
                    keyExtractor={ (item) => item.reading.var }
                    contentInsetAdjustmentBehavior={ 'always' }
                    stickySectionHeadersEnabled={ false }
                    canCancelContentTouches={ true }
                    renderSectionFooter={ () => <ReadingListFooter recipe={ recipe || null } /> }
                />
                <BoringButton
                    containerStyles={ styles.button }
                    onPress={ handleCalculatePressed }
                    title="Calculate"
                />
            </View>
            <InputAccessoryView nativeID={ keyboardAccessoryViewId }>
                <View style={ styles.keyboardAccessoryContainer }>
                    <BoringButton
                        containerStyles={ styles.keyboardAccessoryButton }
                        textStyles={ styles.keyboardAccessoryButtonText }
                        onPress={ () => { Keyboard.dismiss(); Haptic.light(); } }
                        title="Done Typing"
                    />
                </View>
            </InputAccessoryView>
        </SafeAreaView>
    );
}

export const ReadingListScreen = connect(mapStateToProps)(ReadingListScreenComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'white',
    },
    sectionList: {
        flex: 1,
        backgroundColor: '#F5F3FF',
        paddingTop: 12,
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: '#3910E8',
        margin: 12,
        marginBottom: 24
    },
    keyboardAccessoryContainer: {
        backgroundColor: '#F8F8F8',
        padding: 12,
    },
    keyboardAccessoryButton: {
        backgroundColor: 'rgba(57, 16, 232, 0.6)',
        marginHorizontal: 24
    },
    keyboardAccessoryButtonText: {
        color: 'white',
        fontSize: 18
    }
});
