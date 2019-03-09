import * as React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
// @ts-ignore
import { Transition } from 'react-navigation-fluid-transitions';
import { Button } from '../../components/buttons/Button';

import { PDText } from 'components/PDText';
import { Pool } from 'models/Pool';

import { PoolBackgroundView } from './PoolBackgroundView';

interface PoolHeaderViewProps {
    pool?: Pool;
    style?: StyleProp<ViewStyle>;
    handlePressedEdit: ()=>void;
}

export class PoolHeaderView extends React.Component<PoolHeaderViewProps, {}> {
    render() {
        if (!this.props.pool) {
            return <View></View>;
        }

        return (
            <View style={this.props.style}>
                <PoolBackgroundView pool={this.props.pool} style={styles.background} />
                <View style={styles.buttonContainer}>
                    <Transition appear='right' >
                        <Button title={'Edit'} onPress={this.props.handlePressedEdit} styles={styles.button} textStyles={styles.buttonText}/>
                    </Transition>
                </View>
                <PDText style={styles.poolNameText} shared={`pool_name_${this.props.pool.objectId}`}>{ this.props.pool.name }</PDText>
                <PDText style={styles.poolVolumeText} shared={`pool_volume_${this.props.pool.objectId}`}>{ this.props.pool.volume } gallons</PDText>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 190
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
    fakeStarView: {
        position: 'absolute',
        top: -10,
        right: 15,
        width: 17,
        height: 16
    },
    buttonContainer: {
        position: 'absolute',
        top: 15,
        right: 15
    },
    button: {
        position: 'relative',
        backgroundColor: 'rgba(0,0,0,.5)',
        borderRadius: 15
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        marginTop: '2%',
        fontFamily: 'Avenir Next',
        fontSize: 13.2,
        fontWeight: '600',
        paddingHorizontal: 15
    }
});