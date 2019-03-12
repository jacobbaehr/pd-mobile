import * as React from 'react';
import { Button, StyleSheet , Text, TextInput, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import { ReadingEntry } from 'models/logs/ReadingEntry';
import { Reading } from 'models/recipe/Reading';
import { recordInput } from 'redux/readingEntries/Actions';
import { dispatch } from 'redux/AppState';

interface ReadingDetailsScreenProps {
    navigation: NavigationScreenProp<{ params: { reading: Reading, readingEntry?: ReadingEntry }}, {}>;
}

interface ReadingDetailsScreenState {
    value?: number;
}

export class ReadingDetailsScreen extends React.Component<ReadingDetailsScreenProps, ReadingDetailsScreenState> {

    reading: Reading;
    entry?: ReadingEntry;

    constructor(props: ReadingDetailsScreenProps) {
        super(props);

        this.entry = this.props.navigation.state.params.readingEntry;
        this.reading = this.props.navigation.state.params.reading;
        if ((this.entry !== null) && (this.entry !== undefined)) {
            this.state = {
                value: this.entry.value
            };
        } else {
            this.state = {};
        }
    }

    private handleButtonPress = () => {
        const value = this.state.value;
        if (value !== undefined) {
            dispatch(recordInput(this.reading, value));
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
                    {this.reading.name}
                </Text>
                <TextInput style={styles.textInput} onChangeText={this.handleTextChanged} keyboardType={'numeric'}
                    autoFocus={true} defaultValue={defaultValueString} />
                <Button title='Set Reading' onPress={this.handleButtonPress} />
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
