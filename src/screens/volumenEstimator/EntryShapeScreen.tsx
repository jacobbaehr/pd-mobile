import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SVG } from '~/assets/images';
import { CycleButton } from '~/components/buttons/CycleButton';
import { TextButton } from '~/components/buttons/TextButton';
import ModalHeader from '~/components/headers/ModalHeader';
import BorderInputWithLabel from '~/components/inputs/BorderInputWithLabel';
import { PDText } from '~/components/PDText';
import { PDSpacing } from '~/components/PDTheme';

import { EntryShapeValues } from './entryShape';
import EstimateVolume from './EstimateVolume';

const EntryShapeScreen = () => {
    const { width, height } = useWindowDimensions();
    const [unitSelected, setUnitSelected] = useState<'US' | 'Metric'>('US');
    const [shapeValues, setShapeValues] = useState<EntryShapeValues>({
        length: '',
        width: '',
        deepest: '',
        shallowest: '',
    });

    const handlerPressedUnitButton = () => {
        setUnitSelected((prevState) => {
            return prevState === 'US' ? 'Metric' : 'US';
        });
    };

    const handleShapeValues = useCallback((key: keyof EntryShapeValues, value: string) => {
        setShapeValues((prev) => ({ ...prev, [key]: +value }));
    }, []);

    const handleChangedLength = (value: string) => {
        handleShapeValues('length', value);
    };
    const handleChangedWidth = (value: string) => {
        handleShapeValues('width', value);
    };
    const handleChangedDeepest = (value: string) => {
        handleShapeValues('deepest', value);
    };
    const handleChangedShallowest = (value: string) => {
        handleShapeValues('shallowest', value);
    };

    const unitName = unitSelected === 'US' ? 'Feet and Gallons' : 'Meters and Liters';
    const unit = unitSelected === 'US' ? 'FT' : 'MT';
    const isCompletedField = Object.keys(shapeValues).every((sp) => !!shapeValues[sp]);

    return (
        <View style={styles.container}>
            <ModalHeader>Volumen Estimator</ModalHeader>
            <KeyboardAvoidingView behavior="padding" style={styles.content}>
                <View style={styles.shapeContainer}>
                    <SVG.Rectangle width={width} height={height * 0.25} />
                </View>
                <View>
                    <View>
                        <PDText type="bodyGreyBold" color="grey">
                            Unit
                        </PDText>
                        <CycleButton title={unitName} onPress={handlerPressedUnitButton} />
                    </View>
                </View>
                <View>
                    <View style={styles.formRow}>
                        <BorderInputWithLabel
                            value={shapeValues.length}
                            label={`length (${unit})`}
                            placeholder="Length"
                            onChangeText={handleChangedLength}
                            keyboardType="numeric"
                            maxLength={4}
                            returnKeyType="search"
                            returnKeyLabel="Next"
                        />
                        <BorderInputWithLabel
                            value={shapeValues.width}
                            label={`width (${unit})`}
                            placeholder="Width"
                            onChangeText={handleChangedWidth}
                            keyboardType="numeric"
                            maxLength={4}
                            returnKeyType="next"
                            returnKeyLabel="Next"
                        />
                    </View>
                    <View style={styles.formRow}>
                        <BorderInputWithLabel
                            value={shapeValues.deepest}
                            label={`deepest (${unit})`}
                            placeholder="Deepest"
                            onChangeText={handleChangedDeepest}
                            keyboardType="numeric"
                            maxLength={4}
                            returnKeyType="next"
                            returnKeyLabel="Next"
                        />
                        <BorderInputWithLabel
                            value={shapeValues.shallowest}
                            label={`shallowest (${unit})`}
                            placeholder="Shallowest"
                            onChangeText={handleChangedShallowest}
                            keyboardType="numeric"
                            maxLength={4}
                            returnKeyType="done"
                            returnKeyLabel="Done"
                        />
                    </View>
                </View>
                <EstimateVolume unit={unitSelected} shape={shapeValues} />
                <View>
                    <TextButton
                        text="Use Estimated Volume"
                        onPress={() => {}}
                        disabled={!isCompletedField}
                        textStyles={StyleSheet.flatten([styles.buttonText, isCompletedField && { color: '#fff' }])}
                        containerStyles={StyleSheet.flatten([
                            styles.buttonContainer,
                            isCompletedField && { backgroundColor: '#1E6BFF' },
                        ])}
                    />
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default EntryShapeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        paddingHorizontal: PDSpacing.lg,
    },
    formRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: PDSpacing.sm,
    },
    buttonText: {
        fontSize: 18,
        color: '#BBBBBB',
    },
    buttonContainer: {
        height: 40,
        width: '100%',
        borderRadius: 27.5,
        backgroundColor: '#FAFAFA',
    },
    shapeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: PDSpacing.sm,
        marginBottom: PDSpacing.lg,
        backgroundColor: '#1E6BFF10',
        padding: PDSpacing.md,
        borderRadius: 16,
    },
    textInput: {
        color: '#1E6BFF',
    },
});
