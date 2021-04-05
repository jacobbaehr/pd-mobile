import React from 'react';
import { Image, PressableStateCallbackType, ViewStyle } from 'react-native';
import { Pressable } from 'react-native';
import { StyleProp } from 'react-native';
import { ImageSourcePropType, StyleSheet } from 'react-native';
import { images } from '~/assets/images';
import { PDText } from './PDText';
import { PDSpacing, PDTheme, useTheme } from './PDTheme';
import { PDView } from './PDView';


interface ListRowItemStatic {
    label: string;
    image: ImageSourcePropType;
    labelColor: keyof PDTheme;
    valueColor: keyof PDTheme;
    id: string;
    sectionLength: number;
}

interface ListRowItemProps {
    staticProps: ListRowItemStatic
    value?: string | null;
    onPress: () => void;
    index: number;
    toggleVisible: () => void;
}

const getFirstItem = (index: number) =>  index === 0 ? { borderTopLeftRadius: 14, borderTopRightRadius: 14 } : {};
const getLastItem = (index: number, sectionLength: number) =>
    index === sectionLength - 1 ? { borderBottomLeftRadius: 14, borderBottomRightRadius: 14 } : {};

export const ListRowItem : React.FC<ListRowItemProps> = (props) => {
    const { staticProps, index } = props;
    const theme = useTheme();

    const getWrapperStyles : ((state: PressableStateCallbackType) => StyleProp<ViewStyle>) = ({ pressed }) => ({
        ...getFirstItem(index),
        ...getLastItem(index, staticProps.sectionLength),
        backgroundColor: pressed ? theme.greyLight : 'white',
    });

    return (
        <Pressable
            onPress={ props.onPress }
            style={ getWrapperStyles }>
            <PDView style={ styles.container }>
                <Image style={ styles.icon } source={ staticProps.image } />
                <PDText color={ staticProps.labelColor } type="bodySemiBold" >
                    {staticProps.label}
                </PDText>
                <PDText color={ staticProps.valueColor } type="bodySemiBold" >
                    {props.value}
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
    },
    icon: {
        height: 32,
        width: 32,
        borderRadius: 10,
        margin: 5,
        marginRight: PDSpacing.xs,
        marginLeft: PDSpacing.xs,
    },
    arrow: {
        height: 32,
        width: 32,
        marginLeft: 'auto',
    },
});

