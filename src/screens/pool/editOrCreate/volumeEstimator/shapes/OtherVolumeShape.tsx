import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, TextInput, View } from 'react-native';
import { KeyboardButton } from '~/components/buttons/KeyboardButton';
import BorderInputWithLabel from '~/components/inputs/BorderInputWithLabel';
import { useTheme } from '~/components/PDTheme';
import { EstimateRoute } from '~/navigator/shared';
import { useVolumeEstimator } from '~/screens/pool/editOrCreate/hooks/useVolumeEstimator';

import { useRoute } from '@react-navigation/native';

import { OtherMeasurements, VolumeEstimatorHelpers } from '../VolumeEstimatorHelpers';
import { ShapesProps } from './ShapeUtils';
import styles from './VolumeEstimatorStyles';

export const OtherVolumeShape: React.FC<ShapesProps> = (props) => {
    const { params } = useRoute<EstimateRoute>();
    const { unit } = props;
    const { setShape, setEstimation } = useVolumeEstimator(params.shapeId);
    const theme = useTheme();
    const [shapeValues, setShapeValues] = useState<OtherMeasurements>({
        area: '',
        deepest: '',
        shallowest: '',
    });
    const [inputFocus, setInputFocus] = useState<keyof OtherMeasurements>('area');
    const areaRef = React.createRef<TextInput>();
    const deepestRef = React.createRef<TextInput>();
    const shallowestRef = React.createRef<TextInput>();

    useEffect(() => {
        const isAllFieldsCompleted = VolumeEstimatorHelpers.isCompletedField(shapeValues);
        if (isAllFieldsCompleted) {
            setShape(shapeValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shapeValues]);

    const handleShapeValues = useCallback(
        (key: keyof OtherMeasurements, value: string) => {
            setShapeValues((prev) => ({ ...prev, [key]: +value }));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [shapeValues.deepest, shapeValues.area, shapeValues.shallowest],
    );

    const handleFocusInput = useCallback(
        (Key: keyof OtherMeasurements) => {
            setInputFocus(Key);
        },
        [],
    );

    const handleChangedLength = (value: string) => {
        handleShapeValues('area', value);
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
            const results = VolumeEstimatorHelpers.estimateOtherVolume(shapeValues) * VolumeEstimatorHelpers.multiplier[unit];
            setEstimation(results.toString());
        }
    };


    const handleNextFocused = () => {
        switch (inputFocus) {
            case 'area':
                areaRef.current?.focus();
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
    const primaryColor = VolumeEstimatorHelpers.getPrimaryColorByShapeId(params.shapeId, theme);
    const onFocusLabel = VolumeEstimatorHelpers.getOnFocusLabelByShapeKey(inputFocus);

    return (
        <View>
            <View style={ styles.fromRowOneField }>
                <BorderInputWithLabel
                    value={ shapeValues.area }
                    label={ `Surface Area (${unitName})` }
                    placeholder="Surface Area"
                    onChangeText={ handleChangedLength }
                    keyboardType="numeric"
                    maxLength={ 4 }
                    returnKeyType="search"
                    returnKeyLabel="Next"
                    textInputStyleProps={ { color: primaryColor } }
                    inputAccessoryViewID={ VolumeEstimatorHelpers.inputAccessoryId }
                    onFocus={ () => handleFocusInput('deepest') }
                    ref={ areaRef }
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
                    onSubmitEditing={ handleNextFocused }
                    ref={ shallowestRef }
                />
            </View>
            <KeyboardButton nativeID={ VolumeEstimatorHelpers.inputAccessoryId } bgColor={ primaryKeyColor } onPress={ handleNextFocused }>
                {onFocusLabel}
            </KeyboardButton>
        </View>
    );
};
