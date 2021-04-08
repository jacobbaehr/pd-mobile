import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { SVG } from '~/assets/images';
import { TextButton } from '~/components/buttons/TextButton';
import { PDText } from '~/components/PDText';
import { PDSpacing, useTheme } from '~/components/PDTheme';
import { useVolumeEstimator } from '~/hooks/useVolumeEstimator';
import { EstimateRoute } from '~/navigator/PDVolumeNavigator';

import { useRoute } from '@react-navigation/core';

import { AllShapes, VolumeEstimatorHelpers } from '../VolumeEstimatorHelpers';

export const EstimateVolume: React.FC = () => {
    const { params } = useRoute<EstimateRoute>();
    const theme = useTheme();
    const { shape, setEstimation, estimation, unit } = useVolumeEstimator(params.shapeId);
    const unitMetric = VolumeEstimatorHelpers.getLabelForUnit(unit);

    const isAllFieldsCompleted = React.useMemo(() => {
        return VolumeEstimatorHelpers.isCompletedField(shape);
    }, [shape]);

    useEffect(() => {
        if (isAllFieldsCompleted) {
            const multiplier = {
                US: 7.48052,
                Metric: 1000,
            };
            const formula = VolumeEstimatorHelpers.getFormulaByShapeId(params.shapeId);
            const results = formula(shape as AllShapes) * multiplier[unit];
            setEstimation(results.toString());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAllFieldsCompleted, shape, unit]);

    const calc = (): string => {
        let value: number = +estimation;
        let format: string = '--';
        if (value) {
            format = value.toLocaleString('en-US', {
                maximumSignificantDigits: 2,
            });
        }

        return `${format} ${value ? unitMetric : ''}`;
    };

    const primaryColor = VolumeEstimatorHelpers.getPrimaryColorByShapeId(params.shapeId, theme);
    const primaryBlurredColor = VolumeEstimatorHelpers.getPrimaryBlurredColorByShapeId(params.shapeId, theme);

    return (
        <>
            <View style={ StyleSheet.flatten([styles.container, { backgroundColor: primaryBlurredColor }]) }>
                <View style={ styles.row }>
                    <SVG.IconEstimator height={ 16 } width={ 16 } fill={ primaryColor } />
                    <PDText
                        type="bodySemiBold"
                        style={ StyleSheet.flatten([styles.estimatedText, { color: primaryColor }]) }>
                        Estimated volume
                    </PDText>
                </View>
                <View>
                    <PDText>{calc()}</PDText>
                </View>
            </View>
            <View>
                <TextButton
                    text="Use Estimated Volume"
                    onPress={ () => {} }
                    disabled={ !isAllFieldsCompleted }
                    textStyles={ StyleSheet.flatten([styles.buttonText, isAllFieldsCompleted && { color: '#fff' }]) }
                    containerStyles={ StyleSheet.flatten([
                        styles.buttonContainer,
                        isAllFieldsCompleted && { backgroundColor: primaryColor },
                    ]) }
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: PDSpacing.lg,
        padding: PDSpacing.md,
        borderRadius: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    estimatedText: {
        marginLeft: PDSpacing.xs,
        textTransform: 'uppercase',
    },
    estimateResults: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.5,
        textAlign: 'left',
        color: '#262626',
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
});
