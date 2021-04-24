import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SVG } from '~/assets/images';
import { TextButton } from '~/components/buttons/TextButton';
import { PDText } from '~/components/PDText';
import { PDSpacing, useTheme } from '~/components/PDTheme';
import { useVolumeEstimator } from '~/screens/pool/editOrCreate/hooks/useVolumeEstimator';
import { PoolUnit } from '~/models/Pool/PoolUnit';
import { EstimateRoute, PDStackNavigationProps } from '~/navigator/shared';
import { VolumeEstimatorHelpers } from '~/screens/pool/editOrCreate/volumeEstimator/VolumeEstimatorHelpers';

import { useNavigation, useRoute } from '@react-navigation/core';

interface EstimateVolumeProps {
    unit: PoolUnit
}

export const EstimateVolume: React.FC<EstimateVolumeProps> = (props) => {
    const { unit } = props;
    const { params } = useRoute<EstimateRoute>();
    const theme = useTheme();
    const { estimation } = useVolumeEstimator(params.shapeId);
    const unitMetric = VolumeEstimatorHelpers.getLabelForUnit(unit);
    const navigation = useNavigation<PDStackNavigationProps>();
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


    const handlePressedEstimation = () => {
        if (estimation) {
            navigation.navigate('EditOrCreatePoolScreen');
        }
    };

    const primaryColor = VolumeEstimatorHelpers.getPrimaryColorByShapeId(params.shapeId, theme);
    const primaryBlurredColor = VolumeEstimatorHelpers.getPrimaryBlurredColorByShapeId(params.shapeId, theme);
    const result = calc();
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
                    <PDText>{result}</PDText>
                </View>
            </View>
            <View>
                <TextButton
                    text="Use Estimated Volume"
                    onPress={ handlePressedEstimation }
                    disabled={ !estimation }
                    textStyles={ StyleSheet.flatten([styles.buttonText, !!estimation && { color: '#fff' }]) }
                    containerStyles={ StyleSheet.flatten([
                        styles.buttonContainer,
                        !!estimation && { backgroundColor: primaryColor },
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
