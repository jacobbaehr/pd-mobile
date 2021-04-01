import * as React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { PDColor, useTheme } from './PDTheme';

interface PDViewProps extends ViewProps {
    bgColor?: PDColor;
    opacity?: number;
}

/// Wrapper around View component that allows some custom theming
export const PDView: React.FC<PDViewProps> = (props) => {
    const { children, style, ...restProps } = props;
    const theme = useTheme();

    const backgroundColor = props.bgColor !== undefined ? theme[props.bgColor] : 'transparent';
    const colorStylesFromTheme = { backgroundColor };

    const viewStyles = StyleSheet.flatten([colorStylesFromTheme, style]);

    return (
        <View style={ viewStyles } { ...restProps }>
            {children}
        </View>
    );
};
