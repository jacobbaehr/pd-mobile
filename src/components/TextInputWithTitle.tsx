import * as React from 'react';
import { StyleProp, StyleSheet, Text, TextInput, TextStyle, View, ViewStyle } from 'react-native';

export interface TextInputWithTitleProps {
    titleText: string;
    onTextChanged: (text: string) => void;
    placeholderText?: string;
    containerStyles?: StyleProp<ViewStyle>;
    titleTextStyles?: StyleProp<TextStyle>;
    inputStyles?: StyleProp<ViewStyle & TextStyle>;
    secureTextEntry?: boolean;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    autoCorrect?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

/** */
export const TextInputWithTitle: React.FunctionComponent<TextInputWithTitleProps> = (props: TextInputWithTitleProps) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.titleText, props.titleTextStyles]}>{props.titleText}</Text>
            <TextInput
                keyboardType={props.keyboardType}
                autoCorrect={props.autoCorrect}
                autoCapitalize={props.autoCapitalize}
                secureTextEntry={props.secureTextEntry}
                placeholder={props.placeholderText}
                onChangeText={props.onTextChanged}
                style={[styles.input, props.inputStyles]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    titleText: {
        fontFamily: 'Avenir Next',
        fontSize: 18,
        paddingBottom: 5
    },
    input: {
        borderBottomWidth: 2,
        borderColor: '#4a4a4a',
        marginBottom: 15,
        fontFamily: 'Avenir Next',
        fontSize: 22,
        paddingHorizontal: 5,
        color: '#00c89f',
        fontWeight: '500'
    }
});