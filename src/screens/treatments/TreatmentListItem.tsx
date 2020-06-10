import * as React from 'react';
import { View, StyleSheet, Image, NativeSyntheticEvent, TextInputEndEditingEventData, TextStyle } from 'react-native';

import { PDText } from '../../components/PDText';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';

import pluralize from 'pluralize';
import { images } from '~/assets/images';
import { TextInput } from 'react-native-gesture-handler';
import { ChoosyButton } from '~/components/buttons/ChoosyButton';
import { CycleButton } from '~/components/buttons/CycleButton';
import { Util } from '~/services/Util';
import { TreatmentState } from './TreatmentListHelpers';

interface TreatmentListItemProps {
    treatmentState: TreatmentState;
    onTextboxUpdated: (varName: string, text: string) => void;
    onTextboxFinished: (varName: string, text: string) => void;
    handleIconPressed: (varName: string) => void;
    handleUnitsButtonPressed: (varName: string) => void;
    handleTreatmentNameButtonPressed: (varName: string) => void;
    inputAccessoryId?: string;
}

export const TreatmentListItem: React.FunctionComponent<TreatmentListItemProps> = (props) => {

    const [textIsEditing, setTextIsEditing] = React.useState(false);

    const isEditing = textIsEditing;

    const ts = props.treatmentState;
    const t = ts.treatment;

    const treatmentTaken = ts.isOn;
    const leftImageSource = treatmentTaken
        ? images.greenCheck
        : images.incomplete;

    const textInputStyles: TextStyle[] = [styles.textInput];
    const unitsTextStyles: TextStyle[] = [styles.unitsText];
    const treatmentNameTextStyles: TextStyle[] = [styles.treatmentNameText];
    if (ts.isOn || isEditing) {
        textInputStyles.push(styles.textDone);
    }
    if (ts.isOn) {
        unitsTextStyles.push(styles.textDone);
        treatmentNameTextStyles.push(styles.textDone);
    }

    let treatmentName = t.name;
    if (ts.concentration && ts.concentration < 100) {
        treatmentName = `${ts.concentration.toFixed(0)}% ${t.name}`;
    }
    const valueText = Util.removeSuffixIfPresent('.0', ts.value || '');

    const onTextBeginEditing = () => {
        setTextIsEditing(true);
    };

    const onTextChange = (newText: string) => {
        props.onTextboxUpdated(t.var, newText);
    };

    const onTextEndEditing = (event: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
        setTextIsEditing(false);
        const finalText = event.nativeEvent.text;
        props.onTextboxFinished(t.var, finalText);
    };

    const onPressedUnitsButton = () => {
        props.handleUnitsButtonPressed(t.var);
    }

    const onPressedTreatmentNameButton = () => {
        props.handleTreatmentNameButtonPressed(t.var);
    }

    return (
        <View style={ styles.container }>
            <TouchableScale
                onPress={ () => props.handleIconPressed(t.var) }
                activeScale={ 0.98 } >
                <View style={ styles.content }>
                    <View style={ styles.topRow }>
                        <Image
                            style={ styles.circleImage }
                            source={ leftImageSource }
                            width={ 28 }
                            height={ 28 } />
                        <PDText style={ styles.addLabel }>
                            Add
                    </PDText>
                        <TextInput
                            style={ textInputStyles }
                            onFocus={ onTextBeginEditing }
                            onChangeText={ onTextChange }
                            onEndEditing={ onTextEndEditing }
                            keyboardType={ 'decimal-pad' }
                            inputAccessoryViewID={ props.inputAccessoryId }>
                            { valueText }
                        </TextInput>
                        <CycleButton title={ pluralize(ts.units, parseFloat(valueText)) } onPress={ onPressedUnitsButton } textStyles={ unitsTextStyles } styles={ styles.unitsButton } />
                        <PDText style={ styles.ofLabel }>
                            of
                    </PDText>
                        <ChoosyButton title={ treatmentName } onPress={ onPressedTreatmentNameButton } textStyles={ treatmentNameTextStyles } styles={ styles.treatmentNameButton } />
                    </View>
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
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingTop: 4,
        paddingBottom: 3
    },
    circleImage: {
        marginRight: 10,
        marginBottom: 16
    },
    addLabel: {
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
        textAlignVertical: 'center',
        marginRight: 10,
        marginBottom: 16
    },
    ofLabel: {
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
        textAlignVertical: 'center',
        marginLeft: 10,
        marginBottom: 16
    },
    treatmentNameButton: {
        marginBottom: 12,
        alignSelf: 'flex-start',
        marginTop: 5
    },
    treatmentNameText: {
        color: '#B700F8',
        padding: 0,
        textAlignVertical: 'center',
        fontSize: 22
    },
    unitsButton: {
        marginLeft: 9,
        marginBottom: 16
    },
    unitsText: {
        color: '#B700F8',
        fontSize: 22,
        fontWeight: '600'
    },
    textInput: {
        minWidth: 60,
        paddingHorizontal: 12,
        borderWidth: 2,
        borderColor: '#F8F8F8',
        borderRadius: 6,
        color: '#B700F8',
        fontFamily: 'Avenir Next',
        fontWeight: '600',
        fontSize: 22,
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingTop: 2,
        marginBottom: 16
    },
    textDone: {
        color: '#000'
    }
});