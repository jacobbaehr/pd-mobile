import * as React from 'react';
import { View, Text, StyleSheet, Button, SectionList } from 'react-native';

interface SiteListItemProps {
    name: string;

    onSiteSelected: (name: string) => void;

    value?: number;
}

export class SiteListItem extends React.Component<SiteListItemProps, {}> {

    private handleButtonPressed = (): void => {
        this.props.onSiteSelected(this.props.name);
    }

    render() {

        const readingTaken = (this.props.value !== null && this.props.value !== undefined);

        const buttonColor = readingTaken ? 'blue' : 'red';

        return (
            <View style={styles.container}>
                <Button title={this.props.name} onPress={this.handleButtonPressed} color={ buttonColor } />
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