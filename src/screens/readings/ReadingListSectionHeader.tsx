import * as React from 'react';
import { StyleSheet } from 'react-native';
import { PDText } from '../../components/PDText';

interface ReadingListSectionHeaderProps {
    title: string;
}

export const ReadingListSectionHeader: React.FunctionComponent<ReadingListSectionHeaderProps> = (props) => {
    return <PDText style={styles.remainingText}>{props.title}</PDText>;
};

const styles = StyleSheet.create({
    remainingText: {
        marginTop: 7,
        marginBottom: 10,
        marginHorizontal: 16,
        fontWeight: '700',
        fontSize: 28,
    },
});
