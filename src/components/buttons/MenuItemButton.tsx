import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Pressable, StyleSheet, Image } from 'react-native';
import { PDText } from '../PDText';
import { PDView } from '../PDView';
import { images } from '~/assets/images';
import { HeaderInfo, popoverProps } from '~/screens/editPool/EditPoolPopover';
import { PDStackNavigationProps } from '~/navigator/shared';
import { EditPoolMenuItem } from '~/screens/editPool/SectionInfo';
import { useTypedSelector } from '~/redux/AppState';
import { Pool } from '~/models/Pool';
import { ExportService } from '~/services/ExportService';

export type MenuItem =
    | 'name'
    | 'waterType'
    | 'volume'
    | 'wallType'
    | 'recipe'
    | 'customTargets'
    | 'export'
    | 'import'
    | 'delete';
export type NavigationProps = { headerInfo: HeaderInfo } | { prevScreen: string };

interface MenuItemButtonProps extends EditPoolMenuItem {
    index: number;
    sectionLength: number;
    visible: boolean;
    toggleVisible: any;
}
export const MenuItemButton = (props: MenuItemButtonProps) => {
    const navigation = useNavigation<PDStackNavigationProps>();
    const selectedPool = useTypedSelector((state) => state.selectedPool) as Pool;

    const handleDataButtonPressed = async () => {
        try {
            await ExportService.generateAndShareCSV(selectedPool);
        } catch (e) {
            console.error(e);
        }
    };

    const onMenuItemPress = () => {
        let headerInfo: HeaderInfo = popoverProps[props.id];
        let navigationProps: NavigationProps = { headerInfo };
        switch (props.onPressRoute) {
            case 'EditPoolPopover':
                navigateToScreen(navigationProps);
                break;
            case 'RecipeList':
                navigationProps = { prevScreen: 'EditPoolScreen' };
                navigateToScreen(navigationProps);
                break;
            case 'DeletePool':
                props.toggleVisible();
                return;
            case 'Export':
                handleDataButtonPressed();
                return;
            case 'CustomTargets':
                navigateToScreen(navigationProps);
        }
    };

    const navigateToScreen = (navigationProps: NavigationProps) => {
        console.log('here 3');
        navigation.navigate(props.onPressRoute, navigationProps);
    };

    const firstItem = props.index === 0 ? { borderTopLeftRadius: 14, borderTopRightRadius: 14 } : {};
    const lastItem =
        props.index === props.sectionLength - 1 ? { borderBottomLeftRadius: 14, borderBottomRightRadius: 14 } : {};

    return (
        <Pressable
            onPress={onMenuItemPress}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? '#EDEDED' : 'white',
                    ...firstItem,
                    ...lastItem,
                },
            ]}>
            <PDView style={styles.container}>
                <Image style={styles.icon} source={props.image} />
                <PDText color={props.titleColor} type="bodySemiBold">
                    {props.title}
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
