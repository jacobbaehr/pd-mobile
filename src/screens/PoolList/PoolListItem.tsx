import * as React from 'react';
import { View, Text, StyleSheet, Button, SectionList, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Pool } from '../../Models/Pool';

interface PoolListItemProps {
    pool: Pool;

    onPoolSelected: (pool: Pool) => void;

    isEditing: boolean;
}

export class PoolListItem extends React.Component<PoolListItemProps, {}> {

    private handleButtonPressed = (): void => {
        this.props.onPoolSelected(this.props.pool);
    }

    render() {
        const pool = this.props.pool;
        const containerStyles = this.props.isEditing ?
            [styles.container, styles.editingContainer] :
            [styles.container];

        return (
            <View style={containerStyles}>
                <TouchableHighlight
                    style={ styles.content }
                    onPress={this.handleButtonPressed}>
                    <View style={{flex: 1}}>
                        <Text style={styles.poolNameText}>{ pool.name }</Text>
                        <Text style={styles.poolVolumeText}>{ pool.volume } gallons</Text>
                        <Icon name="chevron-right" style={styles.iconStyle}></Icon>
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
    editingContainer: {
        backgroundColor: 'red'
    },
    content: {
        flex: 1,
        backgroundColor: '#0B1520',
        margin: 2,
        borderRadius: 3,
        borderWidth: .1,
        borderColor: '#BCBCC2',
        padding: 2
    },
    poolNameText: {
        color: 'white',
        fontSize: 17,
    },
    poolVolumeText: {
        color: 'white',
        fontSize: 10,
        justifyContent: 'flex-end',
        marginTop: 10
    },
    iconStyle: {
        color: '#B3B3B3',
        alignSelf: 'flex-end',
        position: 'absolute',
        top: 25,
        fontSize: 15
    }
});
