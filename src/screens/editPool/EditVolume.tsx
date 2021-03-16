import * as React from 'react';
import { PDView } from '~/components/PDView';
import { PDText } from '~/components/PDText';
import BorderInputWithLabel from '~/components/inputs/BorderInputWithLabel';
import { Button } from '~/components/buttons/Button';
import { InputAccessoryView, StyleSheet } from 'react-native';
import { SVG } from '~/assets/images';
import { PDSpacing } from '~/components/PDTheme';
import { useNavigation } from '@react-navigation/native';
import { PDStackNavigationProps } from '~/navigator/shared';
import { useState } from 'react';
import { ButtonWithChildren } from '~/components/buttons/ButtonWithChildren';

export const EditVolume = () => {
    const navigation = useNavigation<PDStackNavigationProps>();
    const keyboardAccessoryViewId = 'keyboardaccessoryidpooleditscreen2';

    const handleKeyboardPressed = () => {
        navigation.goBack();
    };

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const textChanged = (text: string) => {
        if (text === '') {
            setButtonDisabled(true);
        } else {
            setButtonDisabled(false);
        }
    };

    const [units, setUnits] = useState('Gallons');

    const unitButtonPressed = () => {
        if (units === 'Gallons') {
            setUnits('Liters');
        } else {
            setUnits('Gallons');
        }
    };

    const estimatorButtonPressed = () => {
        navigation.navigate('PDVolumesNavigator');
    };

    return (
        <PDView>
            <PDView style={styles.inputContainer}>
                <BorderInputWithLabel
                    placeholder="Pool Volume"
                    label="Volume"
                    style={styles.textInput}
                    onChangeText={textChanged}
                    autoFocus
                    inputAccessoryViewID={keyboardAccessoryViewId}
                />
                <PDView>
                    <PDText type="default" style={styles.unit}>
                        UNIT
                    </PDText>
                    <Button
                        styles={styles.unitButton}
                        textStyles={styles.unitButtonText}
                        textColor="pink"
                        title={units}
                        onPress={unitButtonPressed}
                    />
                </PDView>
            </PDView>
            <PDText type="default" style={styles.notSure}>
                NOT SURE?
            </PDText>
            <ButtonWithChildren onPress={estimatorButtonPressed}>
                <PDView style={styles.estimatorButtonContainer}>
                    <SVG.IconEstimator width={16} height={16} fill="#000000" />
                    <PDText style={styles.estimatorButtonText}> Use Volume Estimator</PDText>
                </PDView>
            </ButtonWithChildren>

            <InputAccessoryView nativeID={keyboardAccessoryViewId}>
                <PDView style={styles.inputAccessoryView}>
                    <PDView
                        bgColor={buttonDisabled ? 'greyLight' : 'pink'}
                        opacity={buttonDisabled ? 0.3 : 1}
                        style={styles.saveButtonContainer}>
                        <Button
                            textStyles={styles.saveText}
                            textColor={buttonDisabled ? 'black' : 'white'}
                            title="Save"
                            onPress={handleKeyboardPressed}
                            disabled={buttonDisabled}
                        />
                    </PDView>
                </PDView>
            </InputAccessoryView>
        </PDView>
    );
};

const styles = StyleSheet.create({
    inputAccessoryView: {
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
    },

    textInput: {
        borderColor: '#EDEDED',
        borderWidth: 2,
        borderRadius: 8,
        height: 40,
        width: 159,
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 16,
        paddingLeft: 12,
        color: '#FF0073',
    },
    unit: {
        color: '#737373',
        fontWeight: '700',
        fontSize: 14,
    },
    unitButton: {
        height: 40,
        width: 159,
        borderRadius: 24,
        borderColor: '#EDEDED',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    unitButtonText: {
        fontWeight: '600',
        fontSize: 16,
    },
    notSure: {
        color: '#737373',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: PDSpacing.sm,
        marginBottom: PDSpacing.xs,
    },
    estimatorButtonContainer: {
        height: 40,
        width: 327,
        backgroundColor: '#EDEDED',
        borderRadius: 27.5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    estimatorButtonText: {
        color: '#000000',
        fontSize: 18,
        fontWeight: '700',
    },
    saveButtonContainer: {
        borderRadius: 27.5,
        height: 40,
        width: '90%',
        marginBottom: 24,
        justifyContent: 'center',
        opacity: 0.3,
        alignSelf: 'center',
    },
    saveText: {
        // color: '#000000',
        fontWeight: '700',
        fontSize: 18,

        alignSelf: 'center',
    },
});
