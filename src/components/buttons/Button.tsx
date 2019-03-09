import * as React from 'react';
import { TouchableHighlight, StyleSheet, TextStyle } from 'react-native';
import { PDText } from 'components/PDText';

interface ButtonProps { 
    title: string;

    onPress: () => void;

    styles: any;

    textStyles?: any;

    disabled?: boolean;
}

export class Button extends React.Component<ButtonProps, {}> {

    handleButtonPress = () => {
        this.props.onPress();
    }

    render() {
        const containerStyles = StyleSheet.flatten([styles.container, this.props.styles]);
        let textStyles: TextStyle;
        if (this.props.textStyles != undefined) {
            textStyles = StyleSheet.flatten([styles.text, this.props.textStyles]);
        } else {
            textStyles = styles.text;
        }
        return (
            <TouchableHighlight
                style={containerStyles}
                onPress={this.handleButtonPress}
                disabled={this.props.disabled}>
                <PDText style={this.props.textStyles ? this.props.textStyles : styles.text}>
                    { this.props.title }
                </PDText>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
    text: {
        flex: 1,
        color: 'white',
        textAlign: 'center',
        margin: '.5%',
    }
});