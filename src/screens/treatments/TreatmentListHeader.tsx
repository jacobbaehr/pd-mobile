import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { BackButton } from '~/components/buttons/BackButton';
import { PDProgressBar } from '~/components/PDProgressBar';
import { PDText } from '~/components/PDText';
import { Pool } from '~/models/Pool';
import { getDisplayForWaterType } from '~/models/Pool/WaterType';
import { PDStackNavigationProps } from '~/navigator/shared';
import { useTypedSelector } from '~/redux/AppState';
import { VolumeUnitsUtil } from '~/services/VolumeUnitsUtil';

import { useNavigation } from '@react-navigation/native';

interface ReadingListHeaderProps {
    percentComplete: number;
}

export const ReadingListHeader: React.FunctionComponent<ReadingListHeaderProps> = (props) => {
    const deviceSettings = useTypedSelector((state) => state.deviceSettings);
    const pool = useTypedSelector((state) => state.selectedPool) as Pool;
    const navigation = useNavigation<PDStackNavigationProps>();

    const goBack = () => {
        navigation.goBack();
    };

    // const percentText = `${(this.percentComplete * 100).toFixed(0)}% Complete`;
    const volumeDisplay = VolumeUnitsUtil.getDisplayVolume(pool.gallons, deviceSettings);
    const detailsText = `${getDisplayForWaterType(pool.waterType)} | ${volumeDisplay}`;

    return (
        <View style={ styles.container }>
            <BackButton title={ pool.name } onPress={ goBack } color={ 'readingsBlue' } />
            <PDText type="default" style={ styles.gradientText }>
                Treatments
            </PDText>
            <PDProgressBar progress={ props.percentComplete } foregroundColor={ '#B21FF1' } style={ styles.progressBar } />
            <PDText type="default" style={ styles.detailsText }>
                {detailsText}
            </PDText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 2,
    },
    gradientText: {
        color: '#B21FF1',
        fontSize: 28,
        fontWeight: '700',
        marginTop: 3,
    },
    progressBar: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        height: 6,
    },
    detailsText: {
        color: 'rgba(0,0,0,.6)',
        fontWeight: '600',
        fontSize: 18,
        marginVertical: 7,
    },
});
