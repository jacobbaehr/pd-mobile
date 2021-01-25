import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '~/components/buttons/Button';

import { PDText } from '~/components/PDText';
import { Pool } from '~/models/Pool';

import { BackButton } from '~/components/buttons/BackButton';
import { getDisplayForWaterType } from '~/models/Pool/WaterType';
import { Util } from '~/services/Util';
import { AppState } from '~/redux/AppState';
import { DeviceSettings } from '~/models/DeviceSettings';
import { connect } from 'react-redux';

interface PoolHeaderViewInternalProps {
    deviceSettings: DeviceSettings;
}
interface PoolHeaderViewExternalProps {
    pool: Pool | null;
    handlePressedEdit: () => void;
    handlePressedBack: () => void;
}
type PoolHeaderViewProps = PoolHeaderViewInternalProps & PoolHeaderViewExternalProps;

const mapStateToProps = (state: AppState, ownProps: PoolHeaderViewExternalProps): PoolHeaderViewProps => {
    return {
        ...ownProps,
        deviceSettings: state.deviceSettings,
    };
};

const PoolHeaderViewComponent: React.FunctionComponent<PoolHeaderViewProps> = (props) => {
    if (!props.pool) {
        return <View></View>;
    }

    const volumeDisplay = Util.getDisplayVolume(props.pool.gallons, props.deviceSettings);
    const detailsText = `${getDisplayForWaterType(props.pool.waterType)} | ${volumeDisplay}`;

    return (
        <View style={styles.container}>
            <View style={styles.navRow}>
                <View style={styles.backButtonContainer}>
                    <BackButton
                        title={props.pool.name}
                        onPress={props.handlePressedBack}
                        scale={{ scale: true, scaleLines: 2 }}
                    />
                </View>
                <View style={styles.editButtonContainer}>
                    <Button
                        title={'Edit'}
                        onPress={props.handlePressedEdit}
                        styles={styles.editButton}
                        textStyles={styles.editButtonText}
                        hitSlop={12}
                    />
                </View>
            </View>
            <View style={styles.infoRow}>
                <PDText style={styles.poolVolumeText}>{detailsText}</PDText>
            </View>
        </View>
    );
};

export const PoolHeaderView = connect(mapStateToProps)(PoolHeaderViewComponent);

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 16,
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 2,
    },
    navRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    infoRow: {
        marginTop: 15,
        marginBottom: 15,
    },
    poolVolumeText: {
        color: 'rgba(0,0,0,0.6)',
        fontSize: 18,
        fontWeight: '600',
    },
    editButtonContainer: {
        justifyContent: 'center',
    },
    backButtonContainer: {
        flex: 1,
    },
    editButton: {
        position: 'relative',
        backgroundColor: 'rgba(30,107,255,.1)',
        borderRadius: 15,
    },
    editButtonText: {
        color: '#2D5FFF',
        textAlign: 'center',
        marginTop: '2%',
        fontFamily: 'Avenir Next',
        fontSize: 16,
        fontWeight: '700',
        paddingHorizontal: 15,
        paddingVertical: 3,
    },
});
