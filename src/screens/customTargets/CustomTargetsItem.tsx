import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextButton } from '~/components/buttons/TextButton';
import BorderInputWithLabel from '~/components/inputs/BorderInputWithLabel';
import { PDText } from '~/components/PDText';

interface CustomTargetsItem {
    id: number;
    value: string;
}

const CustomTargetsItem: React.FC<CustomTargetsItem> = (props) => {
    const { value } = props
    
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <PDText style={styles.title}>Chlorine</PDText>
                <TextButton
                    text="Reset"
                    onPress={() => {}}
                    disabled={!value}
                    containerStyles={styles.buttonContainer}
                    textStyles={[styles.buttonText, Boolean(value) && styles.activeButton]}
                />
            </View>
            <View>
                <View style={styles.rowButtonsContainer}>
                    <BorderInputWithLabel label="min" placeholder="123" />
                    <BorderInputWithLabel label="max" placeholder="123" />
                </View>
                <View>
                    <PDText numberOfLines={3} style={styles.body}>
                        This is a really cool description that talks about some really cool innovations in the chlorine
                        industry.
                    </PDText>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#F0F0F0',
        padding: 24,
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderColor: '#F0F0F0',
        marginBottom: 12,
        paddingBottom: 8,
    },
    title: {
        fontWeight: '600',
        fontSize: 16,
        fontStyle: 'normal',
        lineHeight: 24,
    },
    buttonContainer: {
        borderRadius: 12.5,
        backgroundColor: '#00000004',
        minHeight: 34,
        minWidth: 75,
    },
    buttonText: {
        fontSize: 16,
        fontStyle: 'normal',
        color: '#7C7C7C',
    },
    body: {
        fontWeight: '500',
        fontStyle: 'normal',
        fontSize: 14,
        lineHeight: 21,
        color: '#8C8C8C',
    },
    rowButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    activeButton: {
        color: '#000000',
    },
});

export default CustomTargetsItem;
