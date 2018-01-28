import * as React from 'react';
import { View, Text, StyleSheet, Button, SectionList, TouchableHighlight } from 'react-native';

import { Reading } from '../Models/Reading';

interface ReadingListItemProps {
    reading: Reading

    onSiteSelected: (reading: Reading) => void;
}

export class ReadingListItem extends React.Component<ReadingListItemProps, {}> {

    private handleButtonPressed = (): void => {
        this.props.onSiteSelected(this.props.reading);
    }

    render() {
        const readingTaken = (this.props.reading.value !== null && this.props.reading.value !== undefined);
        
        const reading = this.props.reading;
        const readingName = (reading.name === undefined) ? 'Reading' : reading.name;
        
        const readingNameAndValue = `${readingName}: ${reading.getValueAsString()}`
        const readingMessage= (!readingTaken) ? `Tap to log ${readingName}` : reading.getValueAsString();

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