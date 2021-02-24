import React from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';

import { PDText } from '../PDText';

interface ButtonProps extends ViewStyle {
    onPress: () => void;
    label: string;
}

export const Button: React.FC<ButtonProps> = ({ onPress, label, ...rest }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View {...rest}>
                <PDText type="subHeading">{label}</PDText>
            </View>
        </TouchableOpacity>
    );
};
