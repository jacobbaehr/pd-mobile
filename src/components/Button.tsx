import * as React from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native';

interface ButtonProps { 
    title: string;

    onPress: () => void;

    styles: any
}

export class Button extends React.Component<ButtonProps, {}> {

    handleButtonPress = () => {
        this.props.onPress();
    }

    render() {
        const containerStyles = StyleSheet.flatten([styles.container, this.props.styles]);
        return (
            <TouchableHighlight
                style={containerStyles}
                onPress={this.handleButtonPress}>
                <Text style={styles.text}>
                    { this.props.title }
                </Text>
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
        lineHeight: 45
    }
});