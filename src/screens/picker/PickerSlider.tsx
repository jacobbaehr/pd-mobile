import * as React from 'react';
import {
    InputAccessoryView, Keyboard, NativeSyntheticEvent, StyleSheet, TextInputEndEditingEventData,
    View,
} from 'react-native';
// @ts-ignore
import Slider from 'react-native-slider';
import { images } from '~/assets/images';
import { BoringButton } from '~/components/buttons/BoringButton';
import { PDTextInput } from '~/components/inputs/PDTextInput';
import { PlatformSpecific } from '~/components/PlatformSpecific';
import { Haptic } from '~/services/HapticService';

import { PDText } from '../../components/PDText';

export interface PickerSliderState {
    value?: string;
}

interface PickerSliderProps {
    sliderState: PickerSliderState;
    onSlidingStart: () => void;
    onSlidingComplete: () => void;
    onSliderUpdatedValue: (value: number) => void;
    onTextboxUpdated: (text: string) => void;
    onTextboxFinished: (text: string) => void;
}

export const PickerSlider: React.FunctionComponent<PickerSliderProps> = (props) => {
    const keyboardAccessoryViewId = 'picker-percent-keyboard-accessory-view-id';

    const rs = props.sliderState;

    // The continuous slider would glitch around very slightly when dragging because of
    // how we're updating the rs.value prop. The steps mitigate this, and also are more precise.
    const sliderStep = 1;
    const sliderMin = 1;
    const sliderMax = 100;

    // Keep the slider in range sliderMin <= x <= sliderMax
    let sliderValue = rs.value ? parseInt(rs.value, 10) : sliderMin;
    sliderValue = Math.max(Math.min(sliderValue, sliderMax), sliderMin);

    const onTextChange = (newText: string) => {
        props.onTextboxUpdated(newText);
    };

    const onTextEndEditing = (event: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
        const finalText = event.nativeEvent.text;
        props.onTextboxFinished(finalText);
    };

    const onSliderStart = () => {
        props.onSlidingStart();
    };

    const onSliderEnd = () => {
        props.onSlidingComplete();
    };

    return (
        <View style={ styles.container }>
            <View style={ styles.content }>
                <View style={ styles.topRow }>
                    <View style={ styles.topRowContent }>
                        <PDTextInput
                            style={ styles.textInput }
                            onChangeText={ onTextChange }
                            onEndEditing={ onTextEndEditing }
                            keyboardType={ 'number-pad' }
                            inputAccessoryViewID={ keyboardAccessoryViewId }
                            value={ rs.value }
                            maxFontSizeMultiplier={ 1.4 }
                            allowFontScaling
                        />
                        <PDText type="default" style={ styles.unitsText }>
                            %
                        </PDText>
                    </View>
                </View>
                <Slider
                    style={ styles.slider }
                    minimumValue={ sliderMin }
                    maximumValue={ sliderMax }
                    minimumTrackTintColor="#E3E3E3"
                    maximumTrackTintColor="#E3E3E3"
                    thumbImage={ images.sliderThumbBlue }
                    onSlidingStart={ onSliderStart }
                    onSlidingComplete={ onSliderEnd }
                    onValueChange={ (value: number) => props.onSliderUpdatedValue(value) }
                    value={ sliderValue }
                    step={ sliderStep }
                    thumbTouchSize={ { width: 55, height: 55 } }
                />
            </View>
            <PlatformSpecific include={ ['ios'] }>
                <InputAccessoryView nativeID={ keyboardAccessoryViewId }>
                    <View style={ styles.keyboardAccessoryContainer }>
                        <BoringButton
                            containerStyles={ styles.keyboardAccessoryButton }
                            textStyles={ styles.keyboardAccessoryButtonText }
                            onPress={ () => {
                                Keyboard.dismiss();
                                Haptic.light();
                            } }
                            title="Save"
                        />
                    </View>
                </InputAccessoryView>
            </PlatformSpecific>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        alignContent: 'stretch',
        borderRadius: 10,
        marginTop: 22,
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 24,
        borderColor: '#F0F0F0',
        borderWidth: 2,
        elevation: 2,
        marginBottom: 6,
        marginHorizontal: 16,
    },
    topRow: {
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 3,
        marginBottom: 8,
        justifyContent: 'center',
    },
    topRowContent: {
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    slider: {
        flex: 1,
        marginHorizontal: 12,
        marginBottom: 12,
    },
    textInput: {
        width: 80,
        borderWidth: 2,
        borderColor: '#F8F8F8',
        borderRadius: 6,
        color: '#1E6BFF',
        fontFamily: 'Poppins-Regular',
        fontWeight: '600',
        fontSize: 22,
        textAlign: 'center',
    },
    unitsText: {
        color: '#1E6BFF',
        fontSize: 22,
        textAlignVertical: 'center',
        marginLeft: 6,
    },
    keyboardAccessoryContainer: {
        backgroundColor: '#F8F8F8',
        padding: 12,
    },
    keyboardAccessoryButton: {
        backgroundColor: '#1E6BFF',
        marginHorizontal: 24,
    },
    keyboardAccessoryButtonText: {
        color: 'white',
        fontSize: 18,
    },
});
