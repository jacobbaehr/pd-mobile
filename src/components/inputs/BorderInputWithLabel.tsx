import React from 'react';
import { StyleSheet, TextInput, TextInputProps, TextStyle } from 'react-native';

import { PDText } from '../PDText';
import { PDView } from '../PDView';

interface BorderInputWithLabel extends TextInputProps {
    label: string;
    labelStyleProps?: TextStyle;
    textInputStyleProps?: TextStyle;
}

const BorderInputWithLabel: React.FC<BorderInputWithLabel> = (props) => {
    const { label, labelStyleProps, textInputStyleProps, ...restTextInputProps } = props;
    const defaultStyle = { ...styles.textInput, ...textInputStyleProps };
    // console.log(defaultStyle);

    return (
        <PDView>
            <PDText type="bodyGreyBold" color="grey" style={ labelStyleProps }>
                {label}
            </PDText>
            <TextInput style={ defaultStyle } placeholderTextColor="#BBBBBB" blurOnSubmit { ...restTextInputProps } />
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
        fontStyle: 'normal',
        fontWeight: '600',
        color: '#1E6BFF',
        paddingLeft: 8,
    },
});

export default BorderInputWithLabel;
