import React from 'react';
import { StyleSheet, TextInputProps } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { PDBox } from '../PDBox';
import { PDText } from '../PDText';

interface BorderInputWithLabel extends TextInputProps {
    label: string;
}

const BorderInputWithLabel: React.FC<BorderInputWithLabel> = (props) => {
    const { label, ...restTextInputProps } = props;

    return (
        <PDBox>
            <PDText
                variant="bodyGreyBold"
                lineHeight={21}
                fontStyle="normal"
                letterSpacing={0.5}
                color="grey"
                textTransform="uppercase">
                {label}
            </PDText>
            <TextInput {...restTextInputProps} style={styles.textInput} placeholderTextColor="#BBBBBB" blurOnSubmit />
        </PDBox>
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
