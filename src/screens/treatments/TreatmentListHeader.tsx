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

interface TreatmentListHeaderViewInternalProps {
    deviceSettings: DeviceSettings;
}
interface TreatmentListHeaderViewExternalProps {
    handleBackPress: () => void
    pool: Pool
    percentComplete: number
}
type TreatmentListHeaderProps = TreatmentListHeaderViewInternalProps & TreatmentListHeaderViewExternalProps;

const mapStateToProps = (state: AppState, ownProps: TreatmentListHeaderViewExternalProps): TreatmentListHeaderProps => {
    return {
        ...ownProps,
        deviceSettings: state.deviceSettings
    };
};

const TreatmentListHeaderComponent: React.FunctionComponent<TreatmentListHeaderProps> = (props) => {

    // const percentText = `${(this.props.percentComplete * 100).toFixed(0)}% Complete`;
    const volumeDisplay = Util.getDisplayVolume(props.pool.gallons, props.deviceSettings);
    const detailsText = `${getDisplayForWaterType(props.pool.waterType)} | ${volumeDisplay}`;

    return (
        <View style={ styles.container }>
            <BackButton
                title={ props.pool.name }
                onPress={ props.handleBackPress }
                color={ 'treatmentsPurple' } />
            <PDText style={ styles.gradientText } >
                Treatments
                </PDText>
            <PDProgressBar
                progress={ props.percentComplete }
                foregroundColor={ '#B21FF1' }
                style={ styles.progressBar } />
            <PDText style={ styles.detailsText }>
                { detailsText }
            </PDText>
        </View>
    );
}

export const TreatmentListHeader = connect(mapStateToProps)(TreatmentListHeaderComponent);

const gradientColors: Color[] = ['#07A5FF', '#FF0073'];

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        backgroundColor: 'white'
    },
    gradientText: {
        color: '#B21FF1',
        fontSize: 28,
        fontWeight: '700',
        marginTop: 3
    },
    progressBar: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        height: 6
    },
    detailsText: {
        color: 'rgba(0,0,0,.6)',
        fontWeight: '600',
        fontSize: 18,
        marginVertical: 7
    }
});