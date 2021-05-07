import React from 'react';
import { InputAccessoryView, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { PDText } from '../PDText';
import { PDSpacing, PDTheme, useTheme } from '../PDTheme';
import { PDView } from '../PDView';
import { PlatformSpecific } from '../PlatformSpecific';

interface KeyboardButtonProps extends TouchableOpacityProps {
    nativeID: string;
    bgColor?: keyof PDTheme
    textColor?: keyof PDTheme
}


export const KeyboardButton : React.FC<KeyboardButtonProps> = (props) => {
    const { nativeID, bgColor = 'greyLight', textColor = 'white', children, ...touchableProps } = props;
    const theme = useTheme();

    const backgroundColor = theme[bgColor];

    return (
        <PlatformSpecific include={ ['ios'] }>
            <InputAccessoryView nativeID={ nativeID } >
                <PDView style={ [styles.keyboardAccessoryContainer, { backgroundColor: theme.white }] }>
                    <TouchableOpacity { ...touchableProps }  style={ [styles.buttonContainer, { backgroundColor }] } >
                        <PDText type="heading" color={ textColor } >
                            {children}
                        </PDText>
                    </TouchableOpacity>
                </PDView>
            </InputAccessoryView>
        </PlatformSpecific>
    );
};


const styles = StyleSheet.create({
    keyboardAccessoryContainer: {
        padding: PDSpacing.lg,
    },
    keyboardAccessoryButton: {
        marginHorizontal: PDSpacing.lg,
    },
    buttonContainer: {
        height: 55,
        borderRadius: 27.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
