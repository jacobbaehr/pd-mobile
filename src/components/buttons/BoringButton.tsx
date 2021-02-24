import * as React from 'react';
import { StyleSheet, StyleProp, TextStyle } from 'react-native';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';

import { PDText } from '~/components/PDText';

interface ButtonProps {
    title: string;
    onPress: () => void;
    containerStyles?: any;
    textStyles?: StyleProp<TextStyle>;
    disabled?: boolean;
}

export class BoringButton extends React.Component<ButtonProps> {
    handleButtonPress = () => {
        this.props.onPress();
    };

    render() {
        return (
            <TouchableScale
                style={[styles.container, this.props.containerStyles]}
                onPress={this.handleButtonPress}
                disabled={this.props.disabled}
                activeScale={0.96}>
                <PDText type="default" style={[styles.text, this.props.textStyles]}>
                    {this.props.title}
                </PDText>
            </TouchableScale>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 55,
        borderRadius: 27.5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 1,
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '700',
    },
});
