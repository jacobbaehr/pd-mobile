import React from 'react';
import { StyleSheet } from 'react-native';
import { AV, useStandardListAnimation } from '~/components/animation/AnimationHelpers';
import { PDTextInput } from '~/components/inputs/PDTextInput';
import { PDText } from '~/components/PDText';
import { useTheme } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';

interface TreatmentListFooterProps {
    text: string;
    updatedText: (newText: string) => void;
    // yuck: just for animation
    index: number;
}

export const TreatmentListFooter: React.FunctionComponent<TreatmentListFooterProps> = (props) => {
    const theme = useTheme();
    const a = useStandardListAnimation(props.index);

    return (
        <AV y={ a.containerY } opacity={ a.opacity }>
            <PDView style={ { paddingHorizontal: 16 } }>
                <PDText type="default" color="purple" style={ styles.sectionTitle }>
                    Notes
                </PDText>
                <PDView bgColor="white" borderColor="border" style={ styles.container }>
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
        </AV>
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
