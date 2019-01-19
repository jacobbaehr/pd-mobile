import * as React from 'react';
import { Text, TextProperties, StyleSheet } from 'react-native';
// @ts-ignore
import { Transition } from 'react-navigation-fluid-transitions';

interface PDTextProps extends TextProperties {
    shared?: string
}

export class PDText extends React.Component<PDTextProps, {}> {

    getText = () => {
        return <Text style={[styles.default, this.props.style]}>{this.props.children}</Text>;
    }

    render() {
        if (this.props.shared === undefined) {
            return this.getText();
        }
        return (
            <Transition shared={this.props.shared}>
                {this.getText()}
            </Transition>
        )
    }
}

const styles = StyleSheet.create({
    default: {
        fontFamily: 'Avenir Next'
    }
});
