import * as React from 'react';
import { View, Text, StyleSheet, Button, SectionList } from 'react-native';

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
                <View style={styles.content}>
                    <Button title={
                        `${pool.name}: ${pool.volume}`
                        } 
                        onPress={this.handleButtonPressed} 
                        color={ 'white' } 
                        />
                </View>
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
        backgroundColor: '#091243',
        margin: 2,
        borderRadius: 5,
        alignItems: 'flex-start'
    },
    listText: {
        
    }
});
