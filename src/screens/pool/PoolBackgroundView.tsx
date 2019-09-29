import * as React from 'react';
import { Pool } from '../../models/Pool';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface PoolBackgroundProps {
    pool: Pool;
    style?: StyleProp<ViewStyle>;
}

// TODO: put image or gradient here
export class PoolBackgroundView extends React.Component<PoolBackgroundProps, {}> {
    render() {
        return (
            <View style={[styles.container, this.props.style]} />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2091F9',
        flex: 1
    }
});
