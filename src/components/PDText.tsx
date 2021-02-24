import * as React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { PDColor, useTheme } from '~/components/PDTheme';

type PDTextType =
    | 'default'
    | 'tooltip'
    | 'button'
    | 'bodyRegular'
    | 'bodyBold'
    | 'bodySemiBold'
    | 'bodyMedium'
    | 'bodyGreyBold'
    | 'subHeading'
    | 'heading';

interface PDTextProps extends TextProps {
    type: PDTextType;
    color?: PDColor;
}

/// PDTheme-compliant wrapper for the Text component. Stick to the theme & avoid using the style prop too often.
export const PDText: React.FC<PDTextProps> = (props) => {
    // The "style" below is possible because PDTextProps extends TextProps.
    // Similarly, "...restProps" is a catch-all so that any other Text props will be passed along...
    const { children, style, ...restProps } = props;
    const theme = useTheme();

    /// Default styles are derived from the "style" of text (from our design system, expressed via the prop)
    const defaultStyles = styles[props.type];
    /// The default color is applied based on the active PDTheme object
    const color = props.color !== undefined ? theme[props.color] : theme.black;
    const colorStylesFromTheme = { color };
    /// Any custom TextStyle properties are also applied at the end, via the "style" prop:
    const textStyles = StyleSheet.flatten([defaultStyles, colorStylesFromTheme, style]);

    return (
        <Text style={textStyles} {...restProps}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    default: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '600',
    },
    tooltip: {
        fontFamily: 'Poppins-Medium',
        fontStyle: 'normal',
        lineHeight: 21,
        fontSize: 14,
    },
    button: {
        fontFamily: 'Poppins-Bold',
        fontStyle: 'normal',
        lineHeight: 21,
        fontSize: 14,
    },
    bodyRegular: {
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        lineHeight: 24,
        fontSize: 16,
    },
    bodyBold: {
        fontFamily: 'Poppins-Bold',
        fontStyle: 'normal',
        lineHeight: 24,
        fontSize: 16,
    },
    bodySemiBold: {
        fontFamily: 'Poppins-SemiBold',
        fontStyle: 'normal',
        lineHeight: 24,
        fontSize: 16,
    },
    bodyMedium: {
        fontFamily: 'Poppins-Medium',
        fontStyle: 'normal',
        lineHeight: 24,
        fontSize: 16,
    },
    bodyGreyBold: {
        fontFamily: 'Poppins-Bold',
        fontStyle: 'normal',
        lineHeight: 21,
        fontSize: 14,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    subHeading: {
        fontFamily: 'Poppins-Bold',
        fontStyle: 'normal',
        lineHeight: 27,
        fontSize: 18,
    },
    heading: {
        fontFamily: 'Poppins-Regular',
        fontWeight: 'bold',
        fontStyle: 'normal',
        lineHeight: 36,
        fontSize: 24,
    },
});
