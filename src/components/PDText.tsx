import * as React from 'react';
import { Text, TextProperties, StyleSheet } from 'react-native';

export class PDText extends React.Component<TextProperties, {}> {
    render() {
        return <Text style={[styles.default, this.props.style]}>{this.props.children}</Text>;
    }
}

const styles = StyleSheet.create({
    default: {
        fontFamily: 'Avenir Next'
    }
});
