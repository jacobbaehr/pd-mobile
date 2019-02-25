import * as React from 'react';
import { Text, TextProperties, StyleSheet } from 'react-native';
// @ts-ignore
import { Transition } from 'react-navigation-fluid-transitions';

interface PDTextProps extends TextProperties {
    shared?: string
    scale?: {scale:boolean, scaleLines:number}
}

export class PDText extends React.Component<PDTextProps, {}> {

    getText = () => {
        let adjustsFontSizeToFit = false
        let numberOfLines = undefined
        if (this.props.scale !== undefined){
            adjustsFontSizeToFit = this.props.scale.scale
            numberOfLines = this.props.scale.scaleLines
        }
        return <Text 
                adjustsFontSizeToFit = { adjustsFontSizeToFit }
                numberOfLines={ numberOfLines }
                style={[styles.default, this.props.style]}
                >{this.props.children}
            </Text>;
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
