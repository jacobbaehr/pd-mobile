import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SVG } from '~/assets/images';
import { PDText } from '~/components/PDText';
import { PDSpacing } from '~/components/PDTheme';

import { EntryShapeValues } from './entryShape';

interface EstimateVolumeProps {
    shape: EntryShapeValues;
    unit: 'US' | 'Metric';
}

const EstimateVolume: React.FC<EstimateVolumeProps> = (props) => {
    const { shape, unit } = props;

    const surfaceArea = +shape.length * +shape.width;
    const averageDepth = +shape.deepest + +shape.shallowest / 2;

    const multiplier = {
        US: 7.48052,
        Metric: 1000,
    };
    const unitMetric = unit === 'US' ? 'Gallons' : 'Litters';

    const isCompletedField = Object.keys(shape).every((sp) => !!shape[sp]);

    const calc = (): string => {
        let value: number = 0;
        let format: string = '--';
        if (isCompletedField) {
            value = surfaceArea * averageDepth * multiplier[unit];
            format = value.toLocaleString('en-US', {
                maximumSignificantDigits: 2,
            });
        }

        return `${format} ${value ? unitMetric : ''}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <SVG.IconEstimator height={16} width={16} fill="#1E6BFF" />
                <PDText type="bodySemiBold" color="blue" style={styles.estimatedText}>
                    Estimated volume
                </PDText>
            </View>
            <View>
                <PDText>{calc()}</PDText>
            </View>
        </View>
    );
};

export default EstimateVolume;

const styles = StyleSheet.create({
    container: {
        marginVertical: PDSpacing.lg,
        padding: PDSpacing.md,
        backgroundColor: '#1E6BFF10',
        borderRadius: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    estimatedText: {
        marginLeft: PDSpacing.xs,
        textTransform: 'uppercase',
        color: '#1E6BFF',
    },
    estimateResults: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.5,
        textAlign: 'left',
        color: '#262626',
    },
});
