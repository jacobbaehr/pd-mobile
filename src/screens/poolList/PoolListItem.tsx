import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
// @ts-ignore
import { Transition } from 'react-navigation-fluid-transitions';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';

import { Pool } from 'models/Pool';
import { PDText } from 'components/PDText';
import { images } from 'assets/images';

import { PoolBackgroundView } from '../pool/PoolBackgroundView';

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
                onPress={this.handleButtonPressed}
                underlayColor={'transparent'}
                activeScale={0.99}>
                <View style={ styles.content }>
                    <PoolBackgroundView style={styles.background} pool={pool}></PoolBackgroundView>
                    <PDText style={styles.poolNameText} shared={`pool_name_${pool.objectId}`}>{ pool.name }</PDText>
                    <PDText style={styles.poolVolumeText} shared={`pool_volume_${pool.objectId}`}>{ pool.volume } gallons</PDText>
                    <Transition appear='right'>
                        <Image
                            style={styles.star}
                            source={images.star}
                            width={17}
                            height={16}/>
                    </Transition>
                </View>
            </TouchableScale>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 190,
        marginHorizontal: 12,
        backgroundColor: 'transparent',
        marginBottom: 10
    },
    content: {
        flex: 1,
        borderRadius: 12,
        padding: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 2
    },
    background: {
        flex: 1,
        borderRadius: 12
    },
    poolNameText: {
        color: 'white',
        fontSize: 28,
        position: 'absolute',
        bottom: 32,
        left: 12,
        right: 12,
        fontWeight: '600'
    },
    poolVolumeText: {
        color: 'white',
        fontSize: 16,
        position: 'absolute',
        bottom: 12,
        left: 12,
        right: 12,
        fontWeight: '500'
    },
    star: {
        position: 'absolute',
        top: 10,
        right: 10
    }
});
