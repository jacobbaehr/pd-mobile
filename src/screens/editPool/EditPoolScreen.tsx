import * as React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { BackButton } from '~/components/buttons/BackButton';
import { MenuItemButton } from '~/components/buttons/MenuItemButton';
import { PDText } from '~/components/PDText';
import { DeviceSettings } from '~/models/DeviceSettings';
import { Pool } from '~/models/Pool';
import { PDNavParams } from '~/navigator/shared';
import { PickerState } from '~/redux/picker/PickerState';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { editPoolSectionInfo } from './SectionInfo';

interface EditPoolScreenProps {
    navigation: StackNavigationProp<PDNavParams, 'EditPool'>;
    selectedPool: Pool | null;
    pickerState: PickerState | null;
    deviceSettings: DeviceSettings;
}

const ListHeader = () => {
    return <View style={styles.listHeader} />;
};

export const EditPoolScreen: React.FunctionComponent<EditPoolScreenProps> = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <View style={styles.backButtonContainer}>
                        <BackButton onPress={() => navigation.goBack()} />
                    </View>
                </View>
                <Text style={styles.title}>Edit Pool</Text>
                <View style={styles.headerRight} />
            </View>
            {/* Container for scrollable list on screen */}
            <View style={styles.listContainer}>
                {/* This is a list of sections which each include a header and a list of menu items */}
                <SectionList
                    sections={editPoolSectionInfo}
                    renderSectionHeader={({ section: { headerText } }) => (
                        <PDText type="default" style={styles.sectionHeaderText}>
                            {headerText}
                        </PDText>
                    )}
                    renderItem={({ item }) => {
                        return (
                            <MenuItemButton
                                title={item.name}
                                titleColor={item.titleColor}
                                image={item.image}
                                onPressRoute={item.onPressRoute}
                                value={item.value}
                                valueColor={item.valueColor}
                            />
                        );
                    }}
                    ListHeaderComponent={ListHeader}
                    keyExtractor={(item, index) => item.name + index}
                    stickySectionHeadersEnabled={false}
                    contentContainerStyle={styles.list}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
