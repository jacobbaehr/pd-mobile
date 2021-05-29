import React from 'react';
import { StyleSheet, TextInputProps } from 'react-native';
import { SVG } from '~/assets/images';

import { PDSpacing } from '../PDTheme';
import { PDView } from '../PDView';
import { PDTextInput } from './PDTextInput';

export const SearchInput: React.FC<TextInputProps> = (props) => {
    return (
        <PDView bgColor="greyLight" style={ styles.container }>
            <PDView>
                <SVG.IconSearch />
            </PDView>
            <PDTextInput
                { ...props }
                style={ styles.textInput }
                placeholder="Search"
                placeholderTextColor="#909090"
                keyboardType="default"
                hitSlop={ { top: 5, bottom: 5, left: 20, right: 5 } }
            />
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
        marginHorizontal: PDSpacing.xs,
        flex: 1,
        fontFamily: 'Poppins',
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
        color: '#000',
    },
});
