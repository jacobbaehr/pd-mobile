import * as React from 'react';
import { StyleSheet } from 'react-native';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';
import { connect } from 'react-redux';
import { PDText } from '~/components/PDText';
import { DeviceSettings } from '~/models/DeviceSettings';
import { Pool } from '~/models/Pool';
import { getDisplayForWaterType } from '~/models/Pool/WaterType';
import { AppState } from '~/redux/AppState';
import { VolumeUnitsUtil } from '~/services/VolumeUnitsUtil';

interface PoolListItemInternalProps {
    deviceSettings: DeviceSettings;
}
interface PoolListItemExternalProps {
    pool: Pool;
    onPoolSelected: (pool: Pool) => void;
}
type PoolListItemProps = PoolListItemInternalProps & PoolListItemExternalProps;

const mapStateToProps = (state: AppState, ownProps: PoolListItemExternalProps): PoolListItemProps => {
    return {
        ...ownProps,
        deviceSettings: state.deviceSettings,
    };
};

const PoolListComponent: React.FunctionComponent<PoolListItemProps> = (props) => {
    const handleButtonPressed = (): void => {
        props.onPoolSelected(props.pool);
    };

    const pool = props.pool;
    const volumeDisplay = VolumeUnitsUtil.getDisplayVolume(pool.gallons, props.deviceSettings);

    return (
        <TouchableScale style={ styles.container } onPress={ handleButtonPressed } activeScale={ 0.99 }>
            <PDText type="default" style={ styles.poolNameText }>
                {pool.name}
            </PDText>
            <PDText type="default" style={ styles.poolVolumeText }>{`${getDisplayForWaterType(
                pool.waterType,
            )} | ${volumeDisplay}`}</PDText>
        </TouchableScale>
    );
};

export const PoolListItem = connect(mapStateToProps)(PoolListComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 24,
        marginHorizontal: 12,
        backgroundColor: 'white',
        paddingBottom: 0,
        marginBottom: 15,
        borderColor: '#F0F0F0',
        borderWidth: 2,
    },
    poolNameText: {
        color: 'black',
        fontSize: 22,
        marginTop: 12,
        marginLeft: 24,
        marginRight: 12,
        fontWeight: '700',
    },
    poolVolumeText: {
        color: 'black',
        fontSize: 16,
        // marginTop: 10,
        marginLeft: 24,
        marginRight: 12,
        marginBottom: 12,
        fontWeight: '600',
        opacity: 0.6,
    },
});
