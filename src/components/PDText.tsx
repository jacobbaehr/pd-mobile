import * as React from 'react';
import { StyleSheet, TextStyle } from 'react-native';
import { Theme } from '~/theme';

import {
    ColorProps,
    createText,
    OpacityProps,
    PositionProps,
    TextProps,
    TextShadowProps,
    TypographyProps,
    VisibleProps,
} from '@shopify/restyle';

const Text = createText<Theme>();

type PDText = ColorProps<Theme> &
    OpacityProps<Theme> &
    VisibleProps<Theme> &
    TypographyProps<Theme> &
    TextShadowProps<Theme> &
    TextProps<Theme> &
    PositionProps<Theme>;

interface PDTextProps extends PDText {
    scale?: { scale: boolean; scaleLines: number };
    style?: TextStyle;
}

export const PDText: React.FC<PDTextProps> = (props) => {
    const { scale, children, style, ...restProps } = props;

    let adjustsFontSizeToFit = false;
    let numberOfLines;
    if (scale !== undefined) {
        adjustsFontSizeToFit = scale.scale;
        numberOfLines = scale.scaleLines;
    }

    return (
        <Text
            adjustsFontSizeToFit={adjustsFontSizeToFit}
            numberOfLines={numberOfLines}
            style={[styles.default, style]}
            {...restProps}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    default: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '600',
    },
});
