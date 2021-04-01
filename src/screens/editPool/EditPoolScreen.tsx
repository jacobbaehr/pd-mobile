import * as React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { BackButton } from '~/components/buttons/BackButton';
import { MenuItemButton } from '~/components/buttons/MenuItemButton';
import { PDText } from '~/components/PDText';
import { DeviceSettings } from '~/models/DeviceSettings';
import { Pool } from '~/models/Pool';
import { PDStackNavigationProps } from '~/navigator/shared';

import { useNavigation } from '@react-navigation/native';

import { DeletePool } from './DeletePool';
import { useModal } from '~/hooks/useModal';

import { useTypedSelector } from '~/redux/AppState';
import { EditPoolSectionInfo, usePoolSectionInfo } from './EditPoolSectionInfo';

const ListHeader = () => {
    return <View style={ styles.listHeader } />;
};

export const EditPoolScreen: React.FunctionComponent = () => {
    const navigation = useNavigation<PDStackNavigationProps>();

    const { visible, toggleVisible } = useModal();
    const selectedPool = useTypedSelector((state) => state.selectedPool) as Pool;
    const deviceSettings = useTypedSelector((state) => state.deviceSettings) as DeviceSettings;
    const editPoolSectionInfo: EditPoolSectionInfo[] = usePoolSectionInfo(selectedPool, deviceSettings, toggleVisible);

    return (
        <View style={ styles.container }>
            <View style={ styles.header }>
                <View style={ styles.headerLeft }>
                    <View style={ styles.backButtonContainer }>
                        <BackButton onPress={ () => navigation.goBack() } />
                    </View>
                </View>
                <Text style={ styles.title }>Edit Pool</Text>
                <View style={ styles.headerRight } />
            </View>
            {/* Container for scrollable list on screen */}
            <View style={ styles.listContainer }>
                <SectionList
                    sections={ editPoolSectionInfo }
                    renderSectionHeader={ ({ section: { title } }) => (
                        <PDText type="default" style={ styles.sectionHeaderText }>
                            {title}
                        </PDText>
                    ) }
                    renderItem={ ({ item, index, section }) => {
                        return (
                            <MenuItemButton
                                { ...item }
                                index={ index }
                                sectionLength={ section.data.length }
                                toggleVisible={ toggleVisible }
                            />
                        );
                    } }
                    ListHeaderComponent={ ListHeader }
                    keyExtractor={ (item, index) => item.id + index }
                    stickySectionHeadersEnabled={ false }
                    contentContainerStyle={ styles.list }
                />
            </View>
            <DeletePool visible={ visible } toggleVisible={ toggleVisible } />
        </View>
    );
};

const styles = StyleSheet.create({
    fakeButton: {
        height: 50,
        width: '100%',
        backgroundColor: 'red',
    },
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'flex-start',
    },
    header: {
        height: '13%',
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 2,
    },
    headerLeft: {
        justifyContent: 'flex-end',
        flex: 1,
    },
    backButtonContainer: {
        margin: 16,
    },
    title: {
        color: 'black',
        fontFamily: 'Poppins',
        fontSize: 28,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        alignSelf: 'flex-end',
    },
    headerRight: {
        flex: 1,
    },
    listContainer: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    list: {
        height: '100%',
    },
    separator: {
        height: '7%',
    },
    listHeader: {
        height: '2%',
    },
    sectionHeaderText: {
        width: '100%',
        fontFamily: 'Poppins',
        fontWeight: '700',
        fontSize: 14,
        color: '#737373',
        marginBottom: 15,
        marginTop: 15,
    },
});
