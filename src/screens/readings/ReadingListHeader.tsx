import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Color } from 'csstype';

import { PDText } from '~/components/PDText';
import { BackButton } from '~/components/buttons/BackButton';
import { Pool } from '~/models/Pool';
import { PDGradientText } from '~/components/PDGradientText';
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
        const percentText = `${(this.props.percentComplete * 100).toFixed(0)}% Complete`;

        return (
            <View style={ styles.container }>
                <BackButton
                    title={ this.props.pool.name }
                    onPress={ this.props.handleBackPress } />
                <PDGradientText style={ styles.gradientText } colors={ gradientColors }>
                    Readings
                </PDGradientText>
                <PDProgressBar
                    progress={ this.props.percentComplete }
                    foregroundColors={ gradientColors }
                    style={ styles.progressBar } />
                <PDText style={ styles.percentText }>
                    { percentText }
                </PDText>
            </View>
        );
    }
}

const gradientColors: Color[] = ['#07A5FF', '#FF0073'];

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16
    },
    gradientText: {
        fontSize: 28,
        fontWeight: '700',
        marginTop: 3
    },
    progressBar: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        height: 6
    },
    percentText: {
        color: '#323232',
        fontWeight: '600',
        fontSize: 18,
        marginVertical: 7
    }
});