import * as React from 'react';
import { StyleSheet } from 'react-native';
import { PDText } from '~/components/PDText';

interface EditOrCreateSectionHeaderProps {
    title: string;
}

export const EditOrCreateSectionHeader: React.FC<EditOrCreateSectionHeaderProps> = (props) => {

    return (
        <PDText type="bodyGreyBold" style={ styles.text }>
            {props.title}
        </PDText>
    );
};

const styles = StyleSheet.create({
    text: {
        color: '#737373',
        marginBottom: 10,
        marginTop: 15,
    },
});
