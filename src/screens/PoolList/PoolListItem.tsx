import * as React from 'react';
import { View, Text, StyleSheet, Button, SectionList, TouchableHighlight } from 'react-native';

import { Pool } from '../../Models/Pool';

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
            <View style={styles.container}>
                <TouchableHighlight
                    style={ styles.content }
                    onPress={this.handleButtonPressed}>
                    <View style={{flex: 1}}>
                        <Text style={styles.poolNameText}>{ pool.name }</Text>
                        <Text style={styles.poolVolumeText}>{ pool.volume } gallons</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        height: 70,

    },
    content: {
        flex: 1,
        backgroundColor: '#0B1520',
        margin: 2,
        borderRadius: 3,
        borderWidth: .1,
        borderColor: '#BCBCC2',
        alignItems: 'flex-start',
        padding: 2
    },
    poolNameText: {
        color: 'white'
    },
    poolVolumeText: {
        color: 'white'
    }
});
