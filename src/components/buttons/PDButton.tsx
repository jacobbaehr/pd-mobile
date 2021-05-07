import React from 'react';
import { StyleProp, StyleSheet, TextStyle, ViewProps } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';

import { PDText } from '../PDText';
import { PDColor, useTheme } from '../PDTheme';
import { PDView } from '../PDView';

export interface PDButtonProps extends ViewProps {
    onPress: () => void;
    label: string;
    textStyle: StyleProp<TextStyle>;
    bgColor?: PDColor;
}

export const PDButton: React.FC<PDButtonProps> = (props) => {
    const { onPress, children, style, textStyle, ...rest } = props;
    const theme = useTheme();

    const backgroundColor = props.bgColor !== undefined ? theme[props.bgColor] : 'transparent';
    const colorStylesFromTheme = { backgroundColor };

    const viewStyles = StyleSheet.flatten([colorStylesFromTheme, style]);

    const hitSlop = 5;

    const touchableProps = {
        activeScale: 0.97,
        hitSlop: { top: hitSlop, left: hitSlop, bottom: hitSlop, right: hitSlop },
    };

    return (
        <TouchableScale { ...touchableProps } onPress={ onPress }>
            <PDView style={ viewStyles } { ...rest }>
                <PDText type="subHeading" style={ textStyle }>
                    {children}
                </PDText>
            </PDView>
        </TouchableScale>
    );
};
