import React from 'react';
import { StyleSheet, TextInputProps } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SVG } from '~/assets/images';

import { PDSpacing } from '../PDTheme';
import { PDView } from '../PDView';

export const SearchInput: React.FC<TextInputProps> = (props) => {
    return (
        <PDView bgColor="greyLight" style={ styles.container }>
            <PDView>
                <SVG.IconSearch/>
            </PDView>
            <PDView style={ { marginLeft: 8 } }>
                <TextInput { ...props }  style={ styles.textInput } placeholder="Search" placeholderTextColor="#909090" keyboardType="default"/>
            </PDView>
        </PDView>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 24,
        padding: PDSpacing.xs,
     },
    textInput: {
        fontFamily: 'Poppins',
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
        color: '#000',
    },
});
