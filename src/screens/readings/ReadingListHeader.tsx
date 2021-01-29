import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Color } from 'csstype';

import { PDText } from '~/components/PDText';
import { BackButton } from '~/components/buttons/BackButton';
import { Pool } from '~/models/Pool';
import { PDProgressBar } from '~/components/PDProgressBar';
import { DeviceSettings } from '~/models/DeviceSettings';
import { AppState } from '~/redux/AppState';
import { connect } from 'react-redux';
import { Util } from '~/services/Util';
import { getDisplayForWaterType } from '~/models/Pool/WaterType';

interface ReadingListHeaderViewInternalProps {
    deviceSettings: DeviceSettings;
}
interface ReadingListHeaderViewExternalProps {
    handleBackPress: () => void;
    pool: Pool;
    percentComplete: number;
}
type ReadingListHeaderProps = ReadingListHeaderViewInternalProps & ReadingListHeaderViewExternalProps;

const mapStateToProps = (state: AppState, ownProps: ReadingListHeaderViewExternalProps): ReadingListHeaderProps => {
    return {
        ...ownProps,
        deviceSettings: state.deviceSettings,
    };
};

const ReadingListHeaderComponent: React.FunctionComponent<ReadingListHeaderProps> = (props) => {
    // const percentText = `${(this.props.percentComplete * 100).toFixed(0)}% Complete`;
    const volumeDisplay = Util.getDisplayVolume(props.pool.gallons, props.deviceSettings);
    const detailsText = `${getDisplayForWaterType(props.pool.waterType)} | ${volumeDisplay}`;

    return (
        <View style={styles.container}>
            <BackButton title={props.pool.name} onPress={props.handleBackPress} color={'readingsBlue'} />
            <PDText style={styles.gradientText}>Readings</PDText>
            <PDProgressBar progress={props.percentComplete} foregroundColor={'#3910E8'} style={styles.progressBar} />
            <PDText style={styles.detailsText}>{detailsText}</PDText>
        </View>
    );
};

export const ReadingListHeader = connect(mapStateToProps)(ReadingListHeaderComponent);

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 2,
    },
    gradientText: {
        color: '#3910E8',
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
