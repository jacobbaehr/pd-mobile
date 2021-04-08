import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import BorderInputWithLabel from '~/components/inputs/BorderInputWithLabel';
import { useTheme } from '~/components/PDTheme';
import { useVolumeEstimator } from '~/hooks/useVolumeEstimator';
import { EstimateRoute } from '~/navigator/PDVolumeNavigator';

import { useRoute } from '@react-navigation/native';

import { RectangleMeasurements, VolumeEstimatorHelpers } from '../VolumeEstimatorHelpers';
import styles from './VolumeEstimatorStyles';

export const RectangleVolumeShape: React.FC = () => {
    const { params } = useRoute<EstimateRoute>();
    const { setShape, unit } = useVolumeEstimator(params.shapeId);

    const theme = useTheme();
    const [shapeValues, setShapeValues] = useState<RectangleMeasurements>({
        length: '',
        width: '',
        deepest: '',
        shallowest: '',
    });
    const primaryColor = VolumeEstimatorHelpers.getPrimaryColorByShapeId(params.shapeId, theme);

    useEffect(() => {
        const isAllFieldsCompleted = VolumeEstimatorHelpers.isCompletedField(shapeValues);
        if (isAllFieldsCompleted) {
            setShape(shapeValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shapeValues]);

    const handleShapeValues = useCallback(
        (key: keyof RectangleMeasurements, value: string) => {
            setShapeValues((prev) => ({ ...prev, [key]: value }));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [shapeValues.deepest, shapeValues.length, shapeValues.shallowest, shapeValues.width],
    );

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

    const unitName = VolumeEstimatorHelpers.getAbbreviationUnit(unit);


    return (
        <View>
            <View style={ styles.formRow }>
                <BorderInputWithLabel
                    value={ shapeValues.length }
                    label={ `length (${unitName})` }
                    placeholder="Length"
                    onChangeText={ handleChangedLength }
                    keyboardType="numeric"
                    maxLength={ 4 }
                    returnKeyType="search"
                    returnKeyLabel="Next"
                    textInputStyleProps={ { color: primaryColor } }
                />
                <BorderInputWithLabel
                    value={ shapeValues.width }
                    label={ `width (${unitName})` }
                    placeholder="Width"
                    onChangeText={ handleChangedWidth }
                    keyboardType="numeric"
                    maxLength={ 4 }
                    returnKeyType="next"
                    returnKeyLabel="Next"
                    textInputStyleProps={ { color: primaryColor } }
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
                />
            </View>
        </View>
    );
};
