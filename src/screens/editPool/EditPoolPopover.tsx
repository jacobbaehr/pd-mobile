import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CloseButton } from '../../components/buttons/CloseButton';
import { StyleSheet } from 'react-native';
import { PDNavParams } from '~/navigator/shared';
import { PDView } from '~/components/PDView';

interface EditPoolPopoverProps {
    navigation: StackNavigationProp<PDNavParams>;
}

export const EditPoolPopover: React.FunctionComponent<EditPoolPopoverProps> = () => {
    const navigation = useNavigation();

    return (
        <PDView style={styles.container}>
            <CloseButton onPress={() => navigation.goBack()} containerStyle={styles.closeButton} />
            <PDView style={styles.content}>{/* Screen content goes here */}</PDView>
        </PDView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        display: 'flex',
        height: '100%',
        width: '100%',
    },
    content: {
        backgroundColor: 'white',
    },
    closeButton: {
        alignSelf: 'flex-end',
        right: 16,
        top: 24,
    },
});
