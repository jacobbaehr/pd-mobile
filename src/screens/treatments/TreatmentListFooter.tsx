import React from 'react';
import { StyleSheet } from 'react-native';
import { PDTextInput } from '~/components/inputs/PDTextInput';
import { PDText } from '~/components/PDText';
import { useTheme } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';

interface TreatmentListFooterProps {
    text: string;
    updatedText: (newText: string) => void;
}

export const TreatmentListFooter: React.FunctionComponent<TreatmentListFooterProps> = (props) => {
    const theme = useTheme();

    return (
        <PDView  style={ { paddingHorizontal: 16 } }>
            <PDText type="default" color="purple" style={ styles.sectionTitle }>
                Notes
            </PDText>
            <PDView bgColor="background" borderColor="border" style={ styles.container }>
                <PDTextInput
                    style={ [styles.text , { borderColor: theme.colors.border, color: theme.colors.black }] }
                    value={ props.text }
                    onChangeText={ props.updatedText }
                    multiline={ true }
                    scrollEnabled={ false }
                    maxFontSizeMultiplier={ 1.4 }
                    allowFontScaling
                />
            </PDView>
        </PDView>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 24,
        borderWidth: 2,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    sectionTitle: {
        fontWeight: '700',
        fontSize: 28,
        marginTop: 6,
        marginBottom: 4,
    },
    text: {
        minHeight: 50,
        fontSize: 22,
        fontWeight: '600',
        width: '100%',
    },
});
