import * as React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import { dispatch } from '../redux/AppState';
import { recordInput } from '../redux/Actions';
import { Input } from '../models/recipe/Input';
import { InputEntry } from '../models/recipe/InputEntry';

interface InputDetailsScreenProps {
    navigation: NavigationScreenProp<{ params: { input: Input, inputEntry?: InputEntry }}, {}>;
}

interface InputDetailsScreenState {
    value?: number;
}

export class InputDetailsScreen extends React.Component<InputDetailsScreenProps, InputDetailsScreenState> {

    input: Input;
    entry?: InputEntry;

    constructor(props: InputDetailsScreenProps) {
        super(props);
        
        this.entry = this.props.navigation.state.params.inputEntry;
        this.input = this.props.navigation.state.params.input;
        if ((this.entry !== null) && (this.entry !== undefined)) {
            this.state = {
                value: this.entry.value
            };
        } else {
            this.state = {};
        }
    }

    private handleButtonPress = () => {
        let value = this.state.value;
        if (value != undefined) {
            dispatch(recordInput(this.input.objectId, value));
        }
        this.props.navigation.goBack();
    }

    private handleTextChanged = (text: string) => {
        this.setState({value: Number(text)});
    }

    render() {
        const defaultValueString = (this.state.value === undefined) ? '' : `${this.state.value}`;

        return(
            <View style={styles.container}>
                <Text style={styles.readingNameLabel}>
                    {this.input.name}
                </Text>
                <TextInput style={styles.textInput} onChangeText={this.handleTextChanged} keyboardType={'numeric'}
                    autoFocus={true} defaultValue={defaultValueString} />
                <Button title="Set Reading" onPress={this.handleButtonPress} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
      backgroundColor: '#F5FCFF'
    },
    readingNameLabel: {
        margin: 15,
        justifyContent: 'center'
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        margin: 15,
        textAlign: 'center'
    }
  });
  