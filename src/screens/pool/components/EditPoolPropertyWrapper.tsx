import React from 'react';
import { StyleSheet } from 'react-native';
import { ScreenHeader } from '~/components/headers/ScreenHeader';
import { PDText } from '~/components/PDText';
import { PDSpacing } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';

export interface EditPoolPropertyWrapperProps {
    title: string;
    description: string;
}

export const EditPoolPropertyWrapper: React.FC<EditPoolPropertyWrapperProps> = ({ children, title, description }) => {
    return (
        <PDView style={ styles.container } bgColor="white">
            <ScreenHeader hasBackButton hasBottomLine={ false }>{title}</ScreenHeader>
            <PDText type="bodyMedium" style={ styles.description } numberOfLines={ 3 } >
                {description}
            </PDText>
            <PDView style={ styles.content }>{children}</PDView>
        </PDView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    description: {
        color: '#737373',
        paddingVertical: PDSpacing.lg,
        textAlign: 'center',
        alignSelf: 'center',
        maxWidth: 300,
    },
    content: {
        width: '100%',
        paddingHorizontal: PDSpacing.lg,
        display: 'flex',
    },
});
