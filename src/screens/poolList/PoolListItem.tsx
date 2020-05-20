import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';

import { Pool } from '~/models/Pool';
import { PDText } from '~/components/PDText';
import { getDisplayForWaterType } from '~/models/Pool/WaterType';

interface PoolListItemProps {
    pool: Pool;
    onPoolSelected: (pool: Pool) => void;
}

export class PoolListItem extends React.Component<PoolListItemProps, {}> {

    private handleButtonPressed = (): void => {
        this.props.onPoolSelected(this.props.pool);
    }

    render() {
        const pool = this.props.pool;

        return (
            <TouchableScale
                style={ styles.container }
                onPress={ this.handleButtonPressed }
                underlayColor={ 'transparent' }
                activeScale={ 0.99 }>

                <PDText style={ styles.poolNameText } >{ pool.name }</PDText>
                <PDText style={ styles.poolVolumeText } >{ `${getDisplayForWaterType(pool.waterType)} | ${pool.gallons}` } gallons</PDText>
            </TouchableScale>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 24,
        marginHorizontal: 12,
        backgroundColor: 'white',
        paddingBottom: 0,
        marginBottom: 15
    },
    poolNameText: {
        color: 'black',
        fontSize: 22,
        marginTop: 12,
        marginLeft: 24,
        marginRight: 12,
        fontWeight: '700'
    },
    poolVolumeText: {
        color: 'black',
        fontSize: 16,
        // marginTop: 10,
        marginLeft: 24,
        marginRight: 12,
        marginBottom: 12,
        fontWeight: '600',
        opacity: 0.6
    }
});
