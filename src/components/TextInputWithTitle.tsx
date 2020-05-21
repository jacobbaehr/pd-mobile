import * as React from 'react';
import { StyleProp, StyleSheet, Text, TextInput, TextStyle, View, ViewStyle, ReturnKeyType, NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native';

export interface TextInputWithTitleProps {
    titleText: string;
    subtitleText?: string;
    onTextChanged: (text: string) => void;
    placeholderText?: string;
    containerStyles?: StyleProp<ViewStyle>;
    titleTextStyles?: StyleProp<TextStyle>;
    subtitleTextStyles?: StyleProp<TextStyle>;
    inputStyles?: StyleProp<ViewStyle & TextStyle>;
    secureTextEntry?: boolean;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    autoCorrect?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    returnKeyType?: ReturnKeyType;
    onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
    autoFocus?: boolean;
    poorlyImplementedRefForwardingProp?: React.Ref<TextInput>;
    value?: string;
}

/** */
export class TextInputWithTitle extends React.Component<TextInputWithTitleProps> {
    render() {
        const props = this.props;
        return (
            <View style={ [styles.container, props.containerStyles] }>
                <View style={ styles.titleContainer }>
                    <Text style={ [styles.titleText, props.titleTextStyles] }>{ props.titleText }</Text>
                    <Text style={ [styles.subtitleText, props.subtitleTextStyles] }>{ props.subtitleText }</Text>
                </View>
                <TextInput
                    keyboardType={ props.keyboardType }
                    autoCorrect={ props.autoCorrect }
                    autoCapitalize={ props.autoCapitalize }
                    secureTextEntry={ props.secureTextEntry }
                    placeholder={ props.placeholderText }
                    onChangeText={ props.onTextChanged }
                    style={ [styles.input, props.inputStyles] }
                    returnKeyType={ props.returnKeyType }
                    onSubmitEditing={ props.onSubmitEditing }
                    ref={ props.poorlyImplementedRefForwardingProp }
                    autoFocus={ props.autoFocus }
                    value={ props.value }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
    titleContainer: {
        flexDirection: 'row'
    },
    titleText: {
        fontFamily: 'Avenir Next',
        fontSize: 18,
        paddingBottom: 5,
        marginRight: 5
    },
    subtitleText: {
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