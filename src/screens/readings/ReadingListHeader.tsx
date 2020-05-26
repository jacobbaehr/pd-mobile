import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Color } from 'csstype';

import { PDText } from '~/components/PDText';
import { BackButton } from '~/components/buttons/BackButton';
import { Pool } from '~/models/Pool';
import { PDProgressBar } from '~/components/PDProgressBar';

interface ReadingListHeaderProps {
    // isEmpty: boolean,
    handleBackPress: () => void
    pool: Pool
    // from 0 to 1
    percentComplete: number
}

export class ReadingListHeader extends React.Component<ReadingListHeaderProps, {}> {

    render() {
        // const percentText = `${(this.props.percentComplete * 100).toFixed(0)}% Complete`;
        // const volumeDisplay = Util.getDisplayVolume(props.pool.gallons, props.deviceSettings);
        // const detailsText = `${getDisplayForWaterType(props.pool.waterType)} | ${volumeDisplay}`;
        const detailsText = '<pool info here>';

        return (
            <View style={ styles.container }>
                <BackButton
                    title={ this.props.pool.name }
                    onPress={ this.props.handleBackPress }
                    color={ 'readingsBlue' } />
                <PDText style={ styles.gradientText } >
                    Readings
                </PDText>
                <PDProgressBar
                    progress={ this.props.percentComplete }
                    foregroundColors={ gradientColors }
                    style={ styles.progressBar } />
                <PDText style={ styles.detailsText }>
                    { detailsText }
                </PDText>
            </View>
        );
    }
}

const gradientColors: Color[] = ['#07A5FF', '#FF0073'];

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        backgroundColor: 'white'
    },
    gradientText: {
        color: '#3910E8',
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