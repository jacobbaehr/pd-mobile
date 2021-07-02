import * as React from 'react';
import { StyleSheet } from 'react-native';
import { PDText } from '~/components/PDText';
import { PDSpacing } from '~/components/PDTheme';

export const QuickStartText: React.FC = () => {
    return (
    <PDText color="greyDark" type="bodyMedium" style={ styles.text }>
        If everything looks good, press "continue" at the bottom of the screen.
    </PDText>
    );
};

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        marginTop: PDSpacing.md,
    },
});
