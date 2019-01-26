
import * as React from 'react';
import { Text, TextProperties, StyleSheet, View, MaskedViewIOS } from 'react-native';
// @ts-ignore
import { Transition } from 'react-navigation-fluid-transitions';
import LinearGradient from 'react-native-linear-gradient';
import { Color } from 'csstype';

interface PDGradientTextProps extends TextProperties {
    /// The id for a shared-element fluid transition
    shared?: string
    colors: Color[]
}

export class PDGradientText extends React.Component<PDGradientTextProps, {}> {

    getText() {
        const textStyle = StyleSheet.flatten([styles.default, this.props.style]);
        return(
        <View style={{flexDirection: 'row'}}>
            <MaskedViewIOS maskElement={<Text style={textStyle}>{this.props.children}</Text>}>
                <LinearGradient
                    colors={this.props.colors}
                    start={{ x: -0.2, y: -0.3 }}
                    end={{ x: 1.05, y: 1.2 }}>
                    
                    <Text style={[textStyle, { opacity: 0 }]}>{this.props.children}</Text>
                </LinearGradient>
            </MaskedViewIOS>
            <View style={{flex: 1}} />
        </View>);
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
        fontFamily: 'Avenir Next',
        fontWeight: '700',
        fontSize: 28
    }
});
