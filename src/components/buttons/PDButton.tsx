import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Theme } from '~/theme';

import {
    backgroundColor,
    BackgroundColorProps,
    border,
    BorderProps,
    spacing,
    SpacingProps,
    useRestyle,
} from '@shopify/restyle';

import { PDText } from '../PDText';

const restyleFunctions = [spacing, border, backgroundColor];

type Props = SpacingProps<Theme> &
    BorderProps<Theme> &
    BackgroundColorProps<Theme> & {
        onPress: () => void;
        label: string;
    };

export const Button = ({ onPress, label, ...rest }: Props) => {
    const props = useRestyle(restyleFunctions, rest);

    return (
        <TouchableOpacity onPress={onPress}>
            <View {...props}>
                <PDText variant="subHeading">{label}</PDText>
            </View>
        </TouchableOpacity>
    );
};
