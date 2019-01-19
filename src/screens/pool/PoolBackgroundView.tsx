import * as React from 'react';
import { Pool } from '../../models/Pool';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
// @ts-ignore
import { Transition } from 'react-navigation-fluid-transitions';

interface PoolBackgroundProps {
    pool: Pool;
    style?: StyleProp<ViewStyle>;
}

// TODO: put image or gradient here
export class PoolBackgroundView extends React.Component<PoolBackgroundProps, {}> {
    render() {
        return (
            <Transition shared={`pool_bg_${this.props.pool.objectId}`}>
                <View style={[styles.container, this.props.style]} />
            </Transition>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2091F9',
        flex: 1
    }
});
