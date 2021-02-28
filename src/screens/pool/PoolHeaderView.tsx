import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { BackButton } from '~/components/buttons/BackButton';
import { Button } from '~/components/buttons/Button';
import { Pool } from '~/models/Pool';

import { useNavigation } from '@react-navigation/native';
import { PDText } from '~/components/PDText';
import { Util } from '~/services/Util';
import { useSelector } from 'react-redux';
import { AppState } from '~/redux/AppState';
import { DeviceSettings } from '~/models/DeviceSettings';
import { getDisplayForWaterType } from '~/models/Pool/WaterType';

interface PoolHeaderViewExternalProps {
    pool: Pool | null;
}

export const PoolHeaderView: React.FC<PoolHeaderViewExternalProps> = (props) => {
    const { pool } = props;
    const { navigate, goBack } = useNavigation();
    const deviceSettings = useSelector<AppState>((state) => state.deviceSettings) as DeviceSettings;

    const handlePressedEdit = () => {
        navigate('EditPool');
    };
    const handlePressedBack = () => {
        goBack();
    };

    if (!pool) {
        return <></>;
    }

    const volumeDisplay = Util.getDisplayVolume(pool.gallons, deviceSettings);
    const detailsText = `${getDisplayForWaterType(pool.waterType)} | ${volumeDisplay}`;

    return (
        <View style={styles.container}>
            <View style={styles.navRow}>
                <View style={styles.backButtonContainer}>
                    <BackButton title={pool.name} onPress={handlePressedBack} scale={{ scale: true, scaleLines: 2 }} />
                </View>
                <View style={styles.editButtonContainer}>
                    <Button
                        title="Edit"
                        onPress={handlePressedEdit}
                        styles={styles.editButton}
                        textStyles={styles.editButtonText}
                        hitSlop={12}
                    />
                </View>
            </View>
            <View style={styles.infoRow}>
                <PDText type="default" style={styles.poolVolumeText}>
                    {detailsText}
                </PDText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'column',
        paddingHorizontal: 18,
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 2,
    },
    navRow: {
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
        alignSelf: 'center',
    },
    backButtonContainer: {
        flexGrow: 1,
    },
    editButton: {
        backgroundColor: 'rgba(30,107,255,.1)',
        borderRadius: 15,
    },
    editButtonText: {
        color: '#2D5FFF',
        textAlign: 'center',
        marginTop: '2%',
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        fontWeight: '700',
        paddingHorizontal: 15,
        paddingVertical: 3,
    },
});
