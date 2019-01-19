import * as React from 'react';
import { View, Text, StyleSheet, Button, SectionList, TouchableHighlight } from 'react-native';

import { InputEntry } from '../../models/recipe/InputEntry';
import { Input } from '../../models/recipe/Input';

interface InputEntryListItemProps {
    inputEntry?: InputEntry;
    input: Input;

    onInputSelected: (input: Input, inputEntry?: InputEntry) => void;
}

export class InputEntryListItem extends React.Component<InputEntryListItemProps, {}> {

    private handleButtonPressed = (): void => {
        this.props.onInputSelected(this.props.input, this.props.inputEntry);
    }

    render() {

        const entry = this.props.inputEntry;
        
        const readingTaken = (entry !== null) && (entry !== undefined);
        
        const input = this.props.input;
        const readingName = (input.name === undefined) ? 'Reading' : input.name;
        
        const readingMessage = readingTaken ? entry!.value : `Tap to log ${readingName}`;

        return (
            <View style={styles.container}>
                <TouchableHighlight
                    style={ styles.content }
                    onPress={this.handleButtonPressed}>
                    <View style={{flex: 1}}>
                        <Text style={styles.readingDescription}>{ readingName }</Text>
                        <Text style={[styles.readingValue, styles.infoReadingValue]}>{ readingMessage } </Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        height: 50,
        alignContent: 'stretch',
    },
    content: {
        flex: 1,
        backgroundColor: '#0B1520',
        margin: 2,
        borderRadius: 3,
        borderWidth: .1,
        borderColor: '#BCBCC2',
        padding: 2
    },
    readingDescription: {
        color: 'white',
        fontSize: 17,
    },
    readingValue: {
        color: 'white',
        justifyContent: 'center',
    },
    infoReadingValue: {
        color: 'grey',

    }

});