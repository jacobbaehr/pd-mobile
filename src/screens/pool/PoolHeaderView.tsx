import * as React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Button } from '~/components/buttons/Button';

import { PDText } from '~/components/PDText';
import { Pool } from '~/models/Pool';

import { CloseButton } from '~/components/buttons/CloseButton';

interface PoolHeaderViewProps {
    pool: Pool | null;
    style: StyleProp<ViewStyle> | null;
    handlePressedEdit: () => void;
    handlePressedBack: () => void;
}

export class PoolHeaderView extends React.Component<PoolHeaderViewProps, {}> {
    render() {
        if (!this.props.pool) {
            return <View></View>;
        }

        const detailsText = `${this.props.pool.gallons} gallons, ${this.props.pool.waterType}`;

        return (
            <View style={ this.props.style }>
                <View style={ styles.buttonContainerRight }>
                    <Button title={ 'Edit' } onPress={ this.props.handlePressedEdit } styles={ styles.button } textStyles={ styles.buttonText } />
                </View>
                <View style={ styles.buttonContainerLeft }>
                    <CloseButton onPress={ this.props.handlePressedBack } />
                </View>
                <PDText style={ styles.poolNameText } >{ this.props.pool.name }</PDText>
                <PDText style={ styles.poolVolumeText } >{ detailsText }</PDText>
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
    buttonContainerRight: {
        position: 'absolute',
        top: 15,
        right: 15
    },
    buttonContainerLeft: {
        position: 'absolute',
        top: 14,
        left: 15
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
        fontSize: 17,
        fontWeight: '600',
        paddingHorizontal: 15
        // paddingVertical: 2
    }
});