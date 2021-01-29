import React from 'react';
import { View, Text, StyleSheet, TextInputProps } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

interface BorderInputWithLabel extends TextInputProps {
    label: string;
}

const BorderInputWithLabel: React.FC<BorderInputWithLabel> = (props) => {
    const {label, ...TextInputProps} = props;

    return (
        <View >
            <Text style={styles.label}>{label}</Text>
            <TextInput {...TextInputProps} style={styles.textInput} placeholderTextColor="#BBBBBB"/>
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 21,
        letterSpacing: 0.5,
        fontStyle: 'normal',
        color: '#999999',
        textTransform: 'uppercase',
    },
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
