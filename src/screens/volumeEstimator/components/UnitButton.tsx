import React from 'react';
import { View } from 'react-native';
import { CycleButton } from '~/components/buttons/CycleButton';
import { PDText } from '~/components/PDText';
import { useTheme } from '~/components/PDTheme';
import { useVolumeEstimator } from '~/hooks/useVolumeEstimator';
import { EstimateRoute } from '~/navigator/PDVolumeNavigator';

import { useRoute } from '@react-navigation/native';

import { VolumeEstimatorHelpers } from '../VolumeEstimatorHelpers';

const UnitButton: React.FC = () => {
    const { params } = useRoute<EstimateRoute>();
    const { unit, setUnit } = useVolumeEstimator(params.shapeId);

    const theme = useTheme();

    const handlerPressedUnitButton = () => {
        setUnit(unit === 'US' ? 'Metric' : 'US');
    };
    const primaryColor = VolumeEstimatorHelpers.getPrimaryColorByShapeId(params.shapeId, theme);

    // Unit Values
    const unitName = unit === 'US' ? 'Feet and Gallons' : 'Meters and Liters';
    return (
        <View>
            <View>
                <PDText type="bodyGreyBold" color="grey">
                    Unit
                </PDText>
                <CycleButton title={unitName} onPress={handlerPressedUnitButton} textStyles={{ color: primaryColor }} />
            </View>
        </View>
    );
};

export default UnitButton;
