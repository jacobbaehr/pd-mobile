import React from 'react';
import { Image, PressableStateCallbackType, ViewStyle } from 'react-native';
import { Pressable } from 'react-native';
import { StyleProp } from 'react-native';
import { StyleSheet } from 'react-native';
import { images, SVG } from '~/assets/images';
import { PDText } from '~/components/PDText';
import { PDSpacing, PDTheme, useTheme } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';


//TODO: Create a wrapper for this component
export interface ListRowItemStatic {
    label: string;
    image: string;
    imageFill: string;
    labelColor?: keyof PDTheme;
    valueColor: keyof PDTheme;
    id: string;
}

//TODO: this needs a better name
export interface ListRowItemNonStatic {
    staticProps: ListRowItemStatic
    value?: string | null;
    onPress: () => void;
}

export interface ListRowItemSectionInfo {
    title: string,
    data: ListRowItemNonStatic[]
}

export interface ListRowItemProps extends ListRowItemNonStatic {
    index: number;
    sectionLength: number;
    toggleVisible?: () => void;
}

const getFirstItem = (index: number) =>  index === 0 ? { borderTopLeftRadius: 14, borderTopRightRadius: 14 } : {};
const getLastItem = (index: number, sectionLength: number) =>
    index === sectionLength - 1 ? { borderBottomLeftRadius: 14, borderBottomRightRadius: 14 } : {};

export const ListRowItem : React.FC<ListRowItemProps> = (props) => {
    const { staticProps, index } = props;
    const theme = useTheme();

    const getWrapperStyles : ((state: PressableStateCallbackType) => StyleProp<ViewStyle>) = ({ pressed }) => ({
        ...getFirstItem(index),
        ...getLastItem(index, props.sectionLength),
        backgroundColor: pressed ? theme.greyLight : 'white',
    });

    const Icon = SVG[staticProps.image];

    return (
        <Pressable
            onPress={ props.onPress }
            style={ getWrapperStyles }>
            <PDView style={ styles.container }>
                <Icon style={ styles.icon } fill={ staticProps.imageFill }/>
                <PDText color={ staticProps.labelColor } type="bodySemiBold" >
                    {staticProps.label}
                </PDText>
                <PDText color={ staticProps.valueColor } type="bodySemiBold" style={ styles.value }>
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
        paddingVertical: 2,
    },
    icon: {
        height: 32,
        width: 32,
        borderRadius: 10,
        margin: 5,
        marginRight: PDSpacing.xs,
        marginLeft: PDSpacing.xs,
    },
    value: {
        flexShrink: 1,
    },
    arrow: {
        height: 32,
        width: 32,
        marginLeft: 'auto',
    },
});

