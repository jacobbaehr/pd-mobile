import * as React from 'react';
import { StyleSheet } from 'react-native';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';

interface ButtonProps {
    onPress: () => void;

    styles?: any;

    textStyles?: any;

    textColor?: any;

    disabled?: boolean;

    hitSlop?: number;
}

export class ButtonWithChildren extends React.Component<ButtonProps, {}> {
    handleButtonPress = () => {
        this.props.onPress();
    };

    render() {
        const slop = this.props.hitSlop || 0;
        return (
            <TouchableScale
                style={[styles.container, this.props.styles]}
                onPress={this.handleButtonPress}
                disabled={this.props.disabled}
                activeScale={0.97}
                hitSlop={{ top: slop, left: slop, bottom: slop, right: slop }}>
                {this.props.children}
            </TouchableScale>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
    text: {
        flex: 1,
        textAlign: 'center',
        margin: '.5%',
    },
});
