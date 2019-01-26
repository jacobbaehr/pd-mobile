import * as React from 'react';
import { StyleSheet } from 'react-native';
import { PDText } from '../../components/PDText';


interface ReadingListSectionHeaderProps {
    title: string
}

export class ReadingListSectionHeader extends React.Component<ReadingListSectionHeaderProps, {}> {

    render() {
        return <PDText style={styles.remainingText}>{this.props.title}</PDText>
    }
}

const styles = StyleSheet.create({
    remainingText: {
        marginTop: 7,
        fontWeight: '700',
        fontSize: 28
    }
});