import * as React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

interface PDTextProps extends TextProps {
    scale?: { scale: boolean, scaleLines: number }
}

export class PDText extends React.Component<PDTextProps, {}> {

    render() {
        let adjustsFontSizeToFit = false
        let numberOfLines = undefined
        if (this.props.scale !== undefined) {
            adjustsFontSizeToFit = this.props.scale.scale
            numberOfLines = this.props.scale.scaleLines
        }
        return <Text
            adjustsFontSizeToFit={ adjustsFontSizeToFit }
            numberOfLines={ numberOfLines }
            style={ [styles.default, this.props.style] }>

            { this.props.children }
        </Text>;
    }
}

const styles = StyleSheet.create({
    default: {
        fontFamily: 'Avenir Next',
        fontWeight: '600'
    }
});
