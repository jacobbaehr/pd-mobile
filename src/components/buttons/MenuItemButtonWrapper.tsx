import React from 'react';
import { Image, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { images } from '~/assets/images';
import { PDText } from '../PDText';
import { PDView } from '../PDView';
import { MenuItemButtonProps } from './MenuItemButton';
import { useTheme } from '~/components/PDTheme';

export const MenuItemButtonWrapper = (props: MenuItemButtonProps) => {
    const theme = useTheme();

    const firstItem = props.index === 0 ? { borderTopLeftRadius: 14, borderTopRightRadius: 14 } : {};
    const lastItem =
        props.index === props.sectionLength - 1 ? { borderBottomLeftRadius: 14, borderBottomRightRadius: 14 } : {};

    const getWrapperStyles = (pressed: boolean): StyleProp<ViewStyle> => {
        let backgroundColor = pressed ? theme.greyLight : 'white';
        return {
            backgroundColor: backgroundColor,
            ...firstItem,
            ...lastItem,
        };
    };

    return (
        <Pressable
            onPress={props.onPress}
            style={({ pressed }) => {
                return getWrapperStyles(pressed);
            }}>
            <PDView style={styles.container}>
                <Image style={styles.icon} source={props.image} />
                <PDText color={props.id === 'delete' ? 'red' : 'black'} type="bodySemiBold">
                    {props.label}
                </PDText>
                <PDText color={props.valueColor} type="bodySemiBold">
                    {props.value}
                </PDText>
                <Image style={styles.arrow} source={images.menuChevronIcon} />
            </PDView>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: 348,
    },
    sectionText: {
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 16,
    },
    icon: {
        height: 32,
        width: 32,
        borderRadius: 10,
        margin: 5,
        marginRight: 8,
    },
    arrow: {
        height: 32,
        width: 32,
        marginLeft: 'auto',
    },
});
