import * as React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { dispatch } from '../Redux/AppState';
import { setReading } from '../Redux/Actions';
import { Reading } from '../Redux/Reducers';

interface DetailsScreenProps {
    navigation: NavigationScreenProp<{ params: { reading: Reading }}, {}>
}

interface DetailsScreenState {
    isInputFocused: boolean
}

export class DetailsScreen extends React.Component<DetailsScreenProps, DetailsScreenState> {

    constructor(props: DetailsScreenProps) {
        super(props);

        this.state = {
            isInputFocused: true
        }
    }

    private handleButtonPress = () => {
        dispatch(setReading(this.props.navigation.state.params.reading.identifier, 4));
    }

    private handleTextChanged = () => {
        console.log('yo');
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.readingNameLabel}>
                    {this.props.navigation.state.params.reading.name}
                </Text>
                <TextInput style={styles.textInput} onChangeText={this.handleTextChanged} keyboardType={'numeric'}
                    autoFocus={this.state.isInputFocused} />
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
  