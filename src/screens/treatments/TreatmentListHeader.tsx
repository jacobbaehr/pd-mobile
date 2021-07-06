import * as React from 'react';
import { StyleSheet } from 'react-native';
import { PDText } from '~/components/PDText';
import { PDSpacing } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';

export const TreatmentListHeader: React.FC = () => {
    return (
        <PDView style={ styles.container }>
            <PDText type="bodyMedium" color="greyDark" >
                Tap on the units to change them.
            </PDText>
        </PDView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: PDSpacing.md,
        paddingHorizontal: PDSpacing.md,
        paddingBottom: PDSpacing.sm,
        backgroundColor: 'transparent',
    },
});
