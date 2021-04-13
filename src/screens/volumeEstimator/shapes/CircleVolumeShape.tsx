import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, TextInput, View } from 'react-native';
import { KeyboardButton } from '~/components/buttons/KeyboardButton';
import BorderInputWithLabel from '~/components/inputs/BorderInputWithLabel';
import { useTheme } from '~/components/PDTheme';
import { useVolumeEstimator } from '~/hooks/useVolumeEstimator';
import { EstimateRoute } from '~/navigator/shared';

import { useRoute } from '@react-navigation/native';

import { CircleMeasurements, VolumeEstimatorHelpers } from '../VolumeEstimatorHelpers';
import { ShapesProps } from './ShapeUtils';
import styles from './VolumeEstimatorStyles';

export const CircleVolumeShape: React.FC<ShapesProps> = (props) => {
    const { params } = useRoute<EstimateRoute>();
    const { unit } = props;
    const { setShape , setEstimation } = useVolumeEstimator(params.shapeId);
    const theme = useTheme();
    const [shapeValues, setShapeValues] = useState<CircleMeasurements>({
        diameter: '',
        deepest: '',
        shallowest: '',
    });
    const [inputFocus, setInputFocus] = useState<keyof CircleMeasurements>('diameter');
    const diameterRef = React.createRef<TextInput>();
    const deepestRef = React.createRef<TextInput>();

    useEffect(() => {
        const isAllFieldsCompleted = VolumeEstimatorHelpers.isCompletedField(shapeValues);
        if (isAllFieldsCompleted) {
            setShape(shapeValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shapeValues]);

    const handleShapeValues = useCallback(
        (key: keyof CircleMeasurements, value: string) => {
            setShapeValues((prev) => ({ ...prev, [key]: +value }));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [shapeValues.deepest, shapeValues.diameter, shapeValues.shallowest],
    );

    const handleFocusInput = useCallback(
        (Key: keyof CircleMeasurements) => {
            setInputFocus(Key);
        },
        [],
    );

    const handleChangedDiameter = (value: string) => {
        handleShapeValues('diameter', value);
    };
    const handleChangedDeepest = (value: string) => {
        handleShapeValues('deepest', value);
    };
    const handleChangedShallowest = (value: string) => {
        handleShapeValues('shallowest', value);
    };


    const calculateVolume = () => {
        const isAllFieldsCompleted = VolumeEstimatorHelpers.isCompletedField(shapeValues);
        if (isAllFieldsCompleted) {
            const formula = VolumeEstimatorHelpers.getFormulaByShapeId(params.shapeId);
            const results = formula(shapeValues) * VolumeEstimatorHelpers.multiplier[unit];
            setEstimation(results.toString());
        }
    };


    const handleNextFocused = () => {
        switch (inputFocus) {
            case 'diameter':
                diameterRef.current?.focus();
                break;

            case 'deepest':
                deepestRef.current?.focus();
                break;

            case 'shallowest':
                calculateVolume();
                Keyboard.dismiss();
                break;
        }
    };

    const unitName = VolumeEstimatorHelpers.getAbbreviationUnit(unit);
    const primaryKeyColor = VolumeEstimatorHelpers.getPrimaryThemKeyByShapeId(params.shapeId);
    const onFocusLabel = VolumeEstimatorHelpers.getOnFocusLabelByShapeKey(inputFocus);
    const primaryColor = VolumeEstimatorHelpers.getPrimaryColorByShapeId(params.shapeId, theme);

    return (
        <View>
            <View style={ styles.fromRowOneField }>
                <BorderInputWithLabel
                    value={ shapeValues.diameter }
                    label={ `Diameter (${unitName})` }
                    placeholder="Diameter"
                    onChangeText={ handleChangedDiameter }
                    keyboardType="numeric"
                    maxLength={ 4 }
                    returnKeyType="search"
                    returnKeyLabel="Next"
                    textInputStyleProps={ { color: primaryColor } }
                    inputAccessoryViewID={ VolumeEstimatorHelpers.inputAccessoryId }
                    onFocus={ () => handleFocusInput('deepest') }
                    ref={ diameterRef }
                />
            </View>
            <View style={ styles.formRow }>
                <BorderInputWithLabel
                    value={ shapeValues.deepest }
                    label={ `deepest (${unitName})` }
                    placeholder="Deepest"
                    onChangeText={ handleChangedDeepest }
                    keyboardType="numeric"
                    maxLength={ 4 }
                    returnKeyType="next"
                    returnKeyLabel="Next"
                    textInputStyleProps={ { color: primaryColor } }
                    inputAccessoryViewID={ VolumeEstimatorHelpers.inputAccessoryId }
                    onFocus={ () => handleFocusInput('shallowest') }
                    ref={ deepestRef }
                />
                <BorderInputWithLabel
                    value={ shapeValues.shallowest }
                    label={ `shallowest (${unitName})` }
                    placeholder="Shallowest"
                    onChangeText={ handleChangedShallowest }
                    keyboardType="numeric"
                    maxLength={ 4 }
                    returnKeyType="done"
                    returnKeyLabel="Done"
                    textInputStyleProps={ { color: primaryColor } }
                    inputAccessoryViewID={ VolumeEstimatorHelpers.inputAccessoryId }
                    onFocus={ () => handleFocusInput('shallowest') }
                />
            </View>
            <KeyboardButton nativeID={ VolumeEstimatorHelpers.inputAccessoryId } bgColor={ primaryKeyColor } onPress={ handleNextFocused }>
                {onFocusLabel}
            </KeyboardButton>
        </View>
    );
};
