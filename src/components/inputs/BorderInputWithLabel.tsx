import React from 'react';
import { StyleSheet, TextInputProps } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { PDView } from '../PDView';
import { PDText } from '../PDText';

interface BorderInputWithLabel extends TextInputProps {
    label: string;
}

const BorderInputWithLabel: React.FC<BorderInputWithLabel> = (props) => {
    const { label, ...restTextInputProps } = props;

    return (
        <PDView>
            <PDText type="bodyGreyBold" color="grey">
                {label}
            </PDText>
            <TextInput
                style={[styles.textInput, props.style]}
                placeholderTextColor="#BBBBBB"
                blurOnSubmit
                {...restTextInputProps}
            />
        </PDView>
    );
};

const styles = StyleSheet.create({
    textInput: {
        borderColor: '#F0F0F0',
        borderWidth: 2,
        borderRadius: 6,
        minWidth: '49%',
        height: 34,
        fontSize: 16,
        lineHeight: 24,
        fontStyle: 'normal',
        fontWeight: '600',
        color: '#1E6BFF',
        paddingLeft: 8,
    },
});

export default BorderInputWithLabel;
