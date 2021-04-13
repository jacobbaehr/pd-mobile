import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SVG } from '~/assets/images';
import { PDText } from '~/components/PDText';
import { PDSpacing, useTheme } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';
import { PDStackNavigationProps } from '~/navigator/shared';


export interface EditPoolPropertyWrapperProps {
    title: string;
    description: string;
}

export const EditPoolPropertyWrapper: React.FC<EditPoolPropertyWrapperProps> = ({ children, title, description }) => {
    const navigation = useNavigation<PDStackNavigationProps>();
    const theme = useTheme();

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <PDView style={ styles.container }>
            <PDView style={ styles.header }>
                <PDView style={ styles.headerRight } />
                <PDView style={ styles.titleContainer }>
                    <PDText type="subHeading">
                        {title}
                    </PDText>
                </PDView>
                <PDView style={ styles.buttonContainer }>
                    <SVG.IconCloseButton style= { styles.closeButton } onPress={ goBack } fill={ theme.black }/>
                </PDView>
            </PDView>
            <PDText style={ styles.description } type="bodyMedium">
                {description}
            </PDText>
            <PDView style={ styles.content }>{children}</PDView>
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
        paddingVertical: PDSpacing.sm,
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
        paddingTop: 30,
    },
    buttonContainer: {
        flex: 1,
    },
    closeButton: {
        top: 8 ,
        right: 16,
        alignSelf: 'flex-end',
    },
    description: {
        color: '#737373',
        paddingVertical: PDSpacing.lg,
        paddingHorizontal: 80,
        textAlign: 'center',
    },
    content: {
        width: '100%',
        paddingHorizontal: PDSpacing.lg,
        display: 'flex',
    },
});
