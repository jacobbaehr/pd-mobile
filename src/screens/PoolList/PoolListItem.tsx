import * as React from 'react';
import { View, Text, StyleSheet, Button, SectionList, TouchableHighlight, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Pool } from '../../models/Pool';

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
                        <Image
                            style={styles.star} 
                            source={require('../../assets/star.png')}
                            width={17} 
                            height={16}/>
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
        height: 230,
        marginHorizontal: 12
    },
    editingContainer: {
        backgroundColor: 'red'
    },
    content: {
        flex: 1,
        backgroundColor: '#0B1520',
        marginBottom: 10,
        borderRadius: 12,
        borderWidth: .1,
        borderColor: '#BCBCC2',
        padding: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 2
    },
    poolNameText: {
        color: 'white',
        fontSize: 17,
        position: 'absolute',
        bottom: 32,
        left: 12,
        right: 12
    },
    poolVolumeText: {
        color: 'white',
        fontSize: 10,
        position: 'absolute',
        bottom: 12,
        left: 12,
        right: 12
    },
    star: {
        position: 'absolute',
        top: 10,
        right: 10
    }
});
