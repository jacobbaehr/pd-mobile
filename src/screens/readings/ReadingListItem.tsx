import * as React from 'react';
import { View, StyleSheet, Image, NativeSyntheticEvent, TextInputEndEditingEventData, TextStyle } from 'react-native';
// import Slider from '@react-native-community/slider';
// @ts-ignore
import Slider from 'react-native-slider';

import { PDText } from '../../components/PDText';
import { Reading } from '../../models/recipe/Reading';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';

import { images } from '~/assets/images';
import { TextInput } from 'react-native-gesture-handler';

export interface ReadingState {
    reading: Reading;
    value?: string;
    isOn: boolean;
}

interface ReadingListItemProps {
    readingState: ReadingState;
    onSlidingStart: () => void;
    onSlidingComplete: (varName: string) => void;
    onSliderUpdatedValue: (varName: string, value: number) => void;
    onTextboxUpdated: (varName: string, text: string) => void;
    onTextboxFinished: (varName: string, text: string) => void;
    handleIconPressed: (varName: string) => void;
    inputAccessoryId?: string;
}

export const ReadingListItem: React.FunctionComponent<ReadingListItemProps> = (props) => {

    const [isSliding, setIsSliding] = React.useState(false);
    const [textIsEditing, setTextIsEditing] = React.useState(false);

    const isEditing = isSliding || textIsEditing;

    const rs = props.readingState;
    const r = rs.reading;

    const readingTaken = rs.isOn;
    const leftImageSource = readingTaken
        ? images.greenCheck
        : images.incomplete;

    // The continuous slider would glitch around very slightly when dragging because of
    // how we're updating the rs.value prop. The steps mitigate this, and also are more precise.
    const sliderStep = Math.pow(10, -r.decimalPlaces);

    // Keep the slider in range sliderMin <= x <= sliderMax
    let sliderValue = (rs.value) ? parseFloat(rs.value) : 0;
    sliderValue = Math.max(Math.min(sliderValue, r.sliderMax), r.sliderMin);

    let readingUnitsText = '';
    if (r.units) {
        readingUnitsText = ` (${r.units})`;
    }

    const textInputStyles: TextStyle[] = [styles.textInput];
    if (!rs.isOn && !isEditing) {
        textInputStyles.push(styles.textInputDisabled);
    };

    const onTextBeginEditing = () => {
        setTextIsEditing(true);
    };

    const onTextChange = (newText: string) => {
        props.onTextboxUpdated(r.var, newText);
    };

    const onTextEndEditing = (event: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
        setTextIsEditing(false);
        const finalText = event.nativeEvent.text;
        props.onTextboxFinished(r.var, finalText);
    };

    const onSliderStart = () => {
        setIsSliding(true);
        props.onSlidingStart();
    };

    const onSliderEnd = () => {
        setIsSliding(false);
        props.onSlidingComplete(r.var);
    };

    return (
        <View style={ styles.container }>
            <TouchableScale
                onPress={ () => props.handleIconPressed(r.var) }
                activeScale={ 0.98 } >
                <View style={ styles.content }>
                    <View style={ styles.topRow }>

                        <Image
                            style={ styles.circleImage }
                            source={ leftImageSource }
                            width={ 28 }
                            height={ 28 } />

                        <PDText style={ styles.readingName }>
                            { r.name }
                            <PDText style={ styles.readingUnits }>
                                { readingUnitsText }
                            </PDText>
                        </PDText>
                        <TextInput
                            style={ textInputStyles }
                            onFocus={ onTextBeginEditing }
                            onChangeText={ onTextChange }
                            onEndEditing={ onTextEndEditing }
                            keyboardType={ 'decimal-pad' }
                            inputAccessoryViewID={ props.inputAccessoryId }>
                            { rs.value }
                        </TextInput>
                    </View>
                    <Slider
                        style={ styles.slider }
                        minimumValue={ r.sliderMin }
                        maximumValue={ r.sliderMax }
                        minimumTrackTintColor="#E3E3E3"
                        maximumTrackTintColor="#E3E3E3"
                        thumbImage={ images.sliderThumbSmall }
                        onSlidingStart={ onSliderStart }
                        onSlidingComplete={ onSliderEnd }
                        onValueChange={ (value: number) => props.onSliderUpdatedValue(r.var, value) }
                        value={ sliderValue }
                        step={ sliderStep }
                        thumbTouchSize={ { width: 55, height: 55 } }
                    />
                </View>
            </TouchableScale>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignContent: 'stretch',
        borderRadius: 10
    },
    content: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 24,
        borderColor: '#F0F0F0',
        borderWidth: 2,
        elevation: 2,
        marginBottom: 12,
        marginHorizontal: 16
    },
    topRow: {
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 3
    },
    slider: {
        flex: 1,
        marginHorizontal: 12,
        marginBottom: 6
    },
    circleImage: {
        marginRight: 10
    },
    readingName: {
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
        flex: 1,
        textAlignVertical: 'center',
        marginTop: 3
    },
    readingUnits: {
        color: 'black',
        opacity: 0.4,
        fontSize: 18,
        fontWeight: '600',
        flex: 1,
        textAlignVertical: 'center',
        marginTop: 3
    },
    textInput: {
        width: 80,
        borderWidth: 2,
        borderColor: '#F8F8F8',
        borderRadius: 6,
        color: '#3910E8',
        fontFamily: 'Avenir Next',
        fontWeight: '600',
        fontSize: 22,
        textAlign: 'center'
    },
    textInputDisabled: {
        color: '#BEBEBE'
    }
});