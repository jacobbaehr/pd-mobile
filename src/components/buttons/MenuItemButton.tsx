import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Pressable, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { PDText } from '../PDText';
import { PDView } from '../PDView';
import { images } from '~/assets/images';

interface MenuItemButtonProps {
    title: string;
    titleColor: string | undefined;
    image: ImageSourcePropType;
    value: string;
    valueColor: string;
    onPressRoute: string;
}

export const MenuItemButton = (props: MenuItemButtonProps) => {
    const navigation = useNavigation();
    return (
        <Pressable
            onPress={ () => {
                navigation.navigate(props.onPressRoute);
            } }
            style={ ({ pressed }) => [
                {
                    backgroundColor: pressed ? '#EDEDED' : 'white',
                    borderRadius: 14,
                },
            ] }>
            <PDView style={ styles.container }>
                <Image style={ styles.icon } source={ props.image } />
                <PDText
                    style={ { fontFamily: 'Poppins', fontWeight: '600', fontSize: 16, color: props.titleColor } }
                    type="default">
                    { props.title }
                </PDText>
                <PDText
                    style={ { fontFamily: 'Poppins', fontWeight: '600', fontSize: 16, color: props.valueColor } }
                    type="default">
                    { props.value }
                </PDText>
                <Image style={ styles.arrow } source={ images.menuChevronIcon } />
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
