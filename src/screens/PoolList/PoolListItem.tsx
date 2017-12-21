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
                <Button title={pool.poolName} onPress={this.handleButtonPressed} color={ 'orange' } />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        height: 50
    }
});
