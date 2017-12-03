import * as React from 'react';
import { View, Text, StyleSheet, Button, SectionList } from 'react-native';

interface SiteListItemProps {
    name: string
    onSiteSelected: (name: string) => void
}

export class SiteListItem extends React.Component<SiteListItemProps, {}> {

    private handleButtonPressed = (): void => {
        this.props.onSiteSelected(this.props.name);
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title={this.props.name} onPress={this.handleButtonPressed} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
        height: 50
    }
});