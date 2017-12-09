import * as React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { dispatch } from '../Redux/AppState';
import { setReading } from '../Redux/Actions';
import { Reading } from '../Models/Reading';

interface DetailsScreenProps {
    navigation: NavigationScreenProp<{ params: { reading: Reading }}, {}>;
}

interface DetailsScreenState {
    isInputFocused: boolean;
    value?: number;
}

export class DetailsScreen extends React.Component<DetailsScreenProps, DetailsScreenState> {

    reading: Reading;

    constructor(props: DetailsScreenProps) {
        super(props);
        
        this.reading = this.props.navigation.state.params.reading;
        this.state = {
            isInputFocused: true,
            value: this.reading.value
        }
    }

    private handleButtonPress = () => {
        dispatch(setReading(this.reading.identifier, this.state.value));
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
                    {this.reading.name}
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
  