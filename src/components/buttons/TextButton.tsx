import * as React from 'react';
// tslint:disable-next-line:ordered-imports
import { StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';

import { PDText } from 'components/PDText';

export interface TextButtonProps {
    text: string;
    onPress: () => void;
    disabled?: boolean;
    containerStyles?: StyleProp<ViewStyle>;
    textStyles?: StyleProp<TextStyle>;
}

export const TextButton: React.FunctionComponent<TextButtonProps> = (props) => {
    return (
        <TouchableScale
            style={props.containerStyles}
            onPress={props.onPress}
            disabled={props.disabled}
            activeScale={0.96}>
            <PDText style={[styles.text, props.textStyles]}>
                {props.text}
            </PDText>
        </TouchableScale>
    );
};

const styles = StyleSheet.create({
    text: {
        flex: 1,
        color: 'white',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '700'
    }
});