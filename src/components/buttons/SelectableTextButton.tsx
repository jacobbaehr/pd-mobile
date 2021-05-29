import * as React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { PDText } from '../PDText';
import { PDView } from '../PDView';

interface SelectableTextButtonProps {
    buttonText: string;
    onPress: (selectedText: string) => void;
    isSelected?: boolean;
}

interface SelectableTextButtonState {
    isSelected: boolean;
}

/** */
export class SelectableTextButton extends React.Component<SelectableTextButtonProps, SelectableTextButtonState> {
    constructor(props: SelectableTextButtonProps) {
        super(props);

        this.state = { isSelected: !!props.isSelected };
    }

    handleOnPress = () => {
        this.setState({ isSelected: !this.state.isSelected });
        this.props.onPress(this.props.buttonText);
    };

    componentWillReceiveProps(props: SelectableTextButtonProps) {
        this.setState({ isSelected: !!props.isSelected });
    }

    render() {
        const buttonStyles = this.state.isSelected ? styles.selectedContainer : styles.unselectedContainer;
        const textStyles = this.state.isSelected ? styles.selectedText : styles.unselectedText;
        return (
            <TouchableWithoutFeedback onPress={ this.handleOnPress }>
                <PDView style={ [styles.baseContainer, buttonStyles] }>
                    <PDText style={ [styles.text, textStyles] }>{this.props.buttonText}</PDText>
                </PDView>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    baseContainer: {
        paddingHorizontal: 5,
        paddingVertical: 3,
        borderRadius: 8,
        borderWidth: 1,
    },
    selectedContainer: {
        borderColor: '#1E6BFF',
    },
    unselectedContainer: {
        borderColor: 'transparent',
    },
    text: {
        fontWeight: '700',
        fontSize: 18,
    },
    selectedText: {
        color: '#1E6BFF',
    },
    unselectedText: {
        color: 'black',
    },
});
