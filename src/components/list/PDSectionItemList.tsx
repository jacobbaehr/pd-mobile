import * as React from 'react';
import {
    Pressable, PressableStateCallbackType, StyleProp, StyleSheet, ViewStyle
} from 'react-native';
import { SVG } from '~/assets/images';
import { PDText } from '~/components/PDText';
import { PDSpacing, useTheme } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';

import { PDSectionListItemProps } from './PDSectionList';

interface PDSectionItemListProps {
    index: number;
    item: PDSectionListItemProps;
    sectionLength: number;
}

export const PDSectionItemList: React.FC<PDSectionItemListProps> = (props) => {
    const theme = useTheme();
    const { index, item, sectionLength } = props;

    const isFirstItem = index === 0;
    const isLastItem = index === sectionLength - 1;


    const getWrapperStyles = ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => {
        const wrapStyles: ViewStyle[] = [{
          backgroundColor: pressed ? theme.greyLight : theme.white,
        }];
        if (isFirstItem) {
            wrapStyles.push(styles.roundTopCorners);
        }
        if (isLastItem) {
            wrapStyles.push(styles.roundBottomCorners);
        }
        return wrapStyles;
      };

    const colorLabel = item.id === 'deletePool' ? 'red' : 'black';
    const Icon = SVG[item.image];

    return (
        <Pressable onPress={ item.onPress } style={ getWrapperStyles }>
            <PDView style={ styles.container }>
                <PDView style={ styles.icon }>
                    <Icon width={ 32 } height={ 32 } />
                </PDView>
                <PDText
                    color={ colorLabel }
                    type="bodySemiBold"
                    style={ { textAlign: 'center', marginRight: PDSpacing.xs / 2 } }>
                    {item.label}
                </PDText>
                <PDText color={ item.valueColor } type="bodySemiBold" style={ styles.value }>
                    {item.value}
                </PDText>
                <SVG.IconChevronForward width={ 16 } height={ 16 } style={ styles.arrow } />
            </PDView>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: PDSpacing.sm,
    },
    icon: {
        marginRight: PDSpacing.xs,
    },
    value: {
        flexShrink: 1,
    },
    arrow: {
        marginLeft: 'auto',
    },
    roundBottomCorners: {
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
    },
    roundTopCorners: {
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
    },
});
