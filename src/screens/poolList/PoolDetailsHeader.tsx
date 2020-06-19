import { Color } from 'csstype';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { BackButton } from '~/components/buttons/BackButton';
import { Button } from '~/components/buttons/Button';
import { PDText } from '~/components/PDText';

interface EditListHeaderProps {
    handleBackPress: () => void;
    buttonText: string;
    rightButtonAction: (() => Promise<void>) | null;
}

export class EditListHeader extends React.Component<EditListHeaderProps, {}> {
    render() {
        const rightButton = (this.props.rightButtonAction != undefined)
            ? <Button title={ 'Delete' } onPress={ () => this.props.rightButtonAction && this.props.rightButtonAction() } styles={ styles.button } textStyles={ styles.buttonText } />
            : null;
        return (
            <View style={ styles.container }>
                <View style={ styles.options }>
                    <View style={ { width: '50%' } }>
                        <BackButton
                            title={ this.props.buttonText ? this.props.buttonText : 'Create' }
                            onPress={ this.props.handleBackPress }
                            scale={ { scale: true, scaleLines: 2 } }
                        />
                    </View>
                    { rightButton }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        paddingTop: 10,
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 20,
        backgroundColor: 'white',
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 2
    },
    options: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row'
    },
    gradientText: {
        fontSize: 28,
        fontWeight: '700',
        marginTop: 3
    },
    button: {
        backgroundColor: 'rgba(0,0,0,1)',
        borderRadius: 10.4,
        alignSelf: 'flex-end',
        top: -10,
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