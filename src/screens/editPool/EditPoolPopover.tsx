import * as React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CloseButton } from '../../components/buttons/CloseButton';
import { StyleSheet } from 'react-native';
import { PDNavParams } from '~/navigator/shared';

interface EditPoolPopoverProps {
    navigation: StackNavigationProp<PDNavParams>;
}

export const EditPoolPopover: React.FunctionComponent<EditPoolPopoverProps> = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <CloseButton onPress={() => navigation.goBack()} containerStyle={styles.closeButton} />
            <View style={styles.content}>{/* Screen content goes here */}</View>
        </View>
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
