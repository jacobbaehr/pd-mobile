import * as React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { PDTheme, PDThemeColors, useTheme } from './PDTheme';

interface PDViewProps extends ViewProps {
    bgColor?: keyof PDTheme;
    borderColor?: keyof PDThemeColors
    opacity?: number;
}

/// Wrapper around View component that allows some custom theming
export const PDView: React.FC<PDViewProps> = (props) => {
    const { children, style, ...restProps } = props;
    const theme = useTheme();

    const backgroundColor = props.bgColor !== undefined ? theme[props.bgColor] : 'transparent';
    const borderColor = props.borderColor ? theme[props.borderColor] : 'transparent';
    const colorStylesFromTheme = { backgroundColor, borderColor };

    const viewStyles = StyleSheet.flatten([colorStylesFromTheme, style]);

    return (
        <View style={ viewStyles } { ...restProps }>
            {children}
        </View>
    );
};
