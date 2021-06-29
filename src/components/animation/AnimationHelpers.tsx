import React from 'react';
import { Animated, StyleSheet, ViewProps } from 'react-native';

// Never set (x | y) and xy at the same time:
interface AVProps extends ViewProps {
    x?: Animated.Value;
    y?: Animated.Value;
    xy?: Animated.ValueXY;
    opacity?: Animated.Value;
    scale?: Animated.Value;
}

/// Syntactic Sugar for animated views
export const AV: React.FC<AVProps> = (props) => {
    const { x, y, xy, opacity, style, scale, ...restProps } = props;

    const finalX = x ?? xy?.x;
    const finalY = y ?? xy?.y;

    const transform = [];
    if (finalX) {
        transform.push({ translateX: finalX });
    }
    if (finalY) {
        transform.push({ translateY: finalY });
    }
    if (scale) {
        transform.push({ scaleX: scale });
        transform.push({ scaleY: scale });
    }

    const otherStyles = StyleSheet.flatten(style);
    const finalStyle = {
        ...otherStyles,
        transform: transform,
        opacity,
    };

    return <Animated.View style={ finalStyle } { ...restProps } />;
};
