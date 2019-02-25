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
    actions: ()=>void;
}

export class PoolHeaderView extends React.Component<PoolHeaderViewProps, {}> {
    render() {
        if (!this.props.pool) {
            return <View></View>;
        }

        return (
            <View style={this.props.style}>
                {/* This is necessary for the fluid transition because the source view is nested in a list */}
                <Transition shared={`pool_star_${this.props.pool.objectId}`}>
                    <View style={styles.fakeStarView}></View>
                </Transition>
                <PoolBackgroundView pool={this.props.pool} style={styles.background} />
                <View style={styles.buttonContainer}>
                    <Button title={'Edit'} onPress={()=>this.props.actions()} styles={styles.button} textStyles={styles.buttonText}/>
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
        height: 250
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
        width: '98%',
        top: '15%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        backgroundColor: 'rgba(0,0,0,.5)',
        borderRadius: 10.4,
        height: 21,
        width: 52
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        marginTop: '2%',
        fontFamily: 'Avenir Next',
        fontSize: 13.2,
        fontWeight: '600',
    }
});