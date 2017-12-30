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
                    <Button 
                        title={ `${pool.name}: \n ${pool.volume} gallons`}
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
        backgroundColor: '#0B1520',
        margin: 2,
        borderRadius: 3,
        borderWidth: .1,
        borderColor: '#BCBCC2',
        alignItems: 'flex-start',
        padding: 2
    },
    listText: {
        
    }
});
