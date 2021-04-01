import React from 'react';
import { StyleSheet } from 'react-native';
import { PDProgressBar } from '~/components/PDProgressBar';
import { PDText } from '~/components/PDText';
import { lightTheme, PDColor, PDSpacing, useTheme } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';

interface ReadingListStickyHeaderProps {
    completedLength: number;
    missingLength: number;
    color: PDColor;
}

/// The reading list header is partially scrollable -- this is the part that persists up top
export const ServiceStickyHeaderList: React.FC<ReadingListStickyHeaderProps> = (props) => {
    const { completedLength, missingLength, color } = props;
    const theme = useTheme();
    const progress = missingLength === 0 ? 1 : completedLength / missingLength;
    const progressColor = theme[color];

    return (
        <PDView style={ styles.container } bgColor="white">
            <PDText type="bodyBold" color="grey" style={ styles.stepsText }>
                {completedLength} of {missingLength} readings completed
            </PDText>
            <PDProgressBar
                progress={ progress }
                foregroundColor={ progressColor }
                style={ { height: 4, backgroundColor: 'rgba(0,0,0,0.2)' } }
            />
        </PDView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: PDSpacing.xs,
        paddingHorizontal: PDSpacing.md,
        paddingBottom: PDSpacing.md,
        borderBottomColor: lightTheme.greyLight,
        borderBottomWidth: 2,
        marginBottom: PDSpacing.md,
    },
    stepsText: {
        textTransform: 'uppercase',
        marginBottom: PDSpacing.xs,
    },
});
