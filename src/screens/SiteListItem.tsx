import * as React from 'react';
import { View, Text, StyleSheet, Button, SectionList } from 'react-native';

import { Reading } from '../Models/Reading';

interface SiteListItemProps {
    reading: Reading

    onSiteSelected: (reading: Reading) => void;
}

export class SiteListItem extends React.Component<SiteListItemProps, {}> {

    private handleButtonPressed = (): void => {
        this.props.onSiteSelected(this.props.reading);
    }

    render() {
        const readingTaken = (this.props.reading.value !== null && this.props.reading.value !== undefined);

        const buttonColor = readingTaken ? 'blue' : 'red';

        const reading = this.props.reading;
        const readingName = (reading.name === undefined) ? 'Reading' : reading.name;

        const readingNameAndValue = `${readingName}: ${reading.getValueAsString()}`

        return (
            <View style={styles.container}>
                <Button title={readingNameAndValue} onPress={this.handleButtonPressed} color={ buttonColor } />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        height: 50
    }
});