import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { CycleButton } from '~/components/buttons/CycleButton';
import { PDText } from '~/components/PDText';
import { useTheme } from '~/components/PDTheme';
import { DeviceSettings } from '~/models/DeviceSettings';
import { PoolUnit } from '~/models/Pool/PoolUnit';
import { EstimateRoute } from '~/navigator/shared';
import { useTypedSelector } from '~/redux/AppState';
import { updateDeviceSettings } from '~/redux/deviceSettings/Actions';
import { VolumeEstimatorHelpers } from '~/screens/volumeEstimator/VolumeEstimatorHelpers';
import { DeviceSettingsService } from '~/services/DeviceSettingsService';
import { VolumeUnitsUtil } from '~/services/VolumeUnitsUtil';

import { useRoute } from '@react-navigation/native';

interface UnitButtonProps  {
    unit: PoolUnit
    handleUnit: (nextUnit: PoolUnit) => void;
}

const UnitButton: React.FC<UnitButtonProps> = (props) => {
    const { unit, handleUnit } = props;
    const { params } = useRoute<EstimateRoute>();
    const deviceSettings = useTypedSelector(state => state.deviceSettings);
    const dispatch = useDispatch();

    const theme = useTheme();


    const updateDeviceSettingsUnit = (nextUnit: PoolUnit) => {
        const newSettings: DeviceSettings = {
            ...deviceSettings,
            units: nextUnit,
        };
        dispatch(updateDeviceSettings(newSettings));
        DeviceSettingsService.saveSettings(newSettings);
    };

    const handlerPressedUnitButton = () => {
        const nextUnit = VolumeUnitsUtil.getNextUnitValue(unit);
        updateDeviceSettingsUnit(nextUnit);
        handleUnit(nextUnit);
    };
    const primaryColor = VolumeEstimatorHelpers.getPrimaryColorByShapeId(params.shapeId, theme);

    // Unit Values
    const unitName = VolumeEstimatorHelpers.getLabelForUnit(unit);

    return (
        <View>
            <View>
                <PDText type="bodyGreyBold" color="grey">
                    Unit
                </PDText>
                <CycleButton title={ unitName } onPress={ handlerPressedUnitButton } textStyles={ { color: primaryColor } } />
            </View>
        </View>
    );
};

export default UnitButton;
