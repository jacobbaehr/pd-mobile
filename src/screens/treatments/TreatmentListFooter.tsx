import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { PDText } from '~/components/PDText';

interface TreatmentListFooterProps {
    text: string;
    updatedText: (newText: string) => void;
}

export const TreatmentListFooter: React.FunctionComponent<TreatmentListFooterProps> = (props) => {
    return (
        <View style={{ paddingHorizontal: 16 }}>
            <PDText type="default" style={styles.sectionTitle}>
                Notes
            </PDText>
            <View style={styles.container}>
                <TextInput
                    style={styles.text}
                    value={props.text}
                    onChangeText={props.updatedText}
                    multiline={true}
                    scrollEnabled={false}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 24,
        overflow: 'hidden',
        borderColor: '#F0F0F0',
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
        color: '#B700F8',
    },
    text: {
        color: 'black',
        backgroundColor: 'white',
        minHeight: 50,
        fontSize: 22,
        fontWeight: '600',
        width: '100%',
    },
});
