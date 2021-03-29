import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { CloseButton } from '~/components/buttons/CloseButton';
import { PDText } from '~/components/PDText';
import { PDView } from '~/components/PDView';
import { PDStackNavigationProps } from '~/navigator/shared';

export interface EditPoolPropertyWrapperProps {
    title: string;
    description: string;
}

export const EditPoolPropertyWrapper: React.FC<EditPoolPropertyWrapperProps> = ({ children, title, description }) => {
    const navigation = useNavigation<PDStackNavigationProps>();

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <PDView style={styles.container}>
            <PDView style={styles.header}>
                <PDView style={styles.headerRight} />
                <PDView style={styles.titleContainer}>
                    <PDText style={styles.title} type="default">
                        {title}
                    </PDText>
                </PDView>
                <PDView style={styles.buttonContainer}>
                    <CloseButton onPress={goBack} containerStyle={styles.closeButton} />
                </PDView>
            </PDView>
            <PDText style={styles.description} type="default">
                {description}
            </PDText>
            <PDView style={styles.details}>{children}</PDView>
            <PDView style={styles.content} />
        </PDView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    header: {
        height: '7%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerRight: {
        flex: 1,
    },
    titleContainer: {
        alignSelf: 'center',
        flex: 1,
        position: 'absolute',
        top: 30,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
    },
    buttonContainer: {
        flex: 1,
    },
    closeButton: {
        top: 16,
        right: 16,
        alignSelf: 'flex-end',
    },
    description: {
        fontWeight: '500',
        fontSize: 16,
        color: '#737373',
        marginHorizontal: 80,
        marginVertical: 32,
        textAlign: 'center',
    },
    content: {
        backgroundColor: 'white',
    },
    details: {
        width: '85%',
    },
});
