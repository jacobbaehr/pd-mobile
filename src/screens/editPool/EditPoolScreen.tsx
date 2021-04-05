import * as React from 'react';
import { SectionList, StyleSheet } from 'react-native';
import { MenuItemButton } from '~/screens/editPool/components/MenuItemButton';
import { PDText } from '~/components/PDText';
import { DeviceSettings } from '~/models/DeviceSettings';
import { Pool } from '~/models/Pool';

import { DeletePool } from './components/DeletePool';
import { useModal } from '~/hooks/useModal';

import { useTypedSelector } from '~/redux/AppState';
import { EditPoolSectionInfo, usePoolSectionInfo } from './EditPoolSectionInfo';
import { ScreenHeader } from '~/components/headers/ScreenHeader';
import { PDSafeAreaView } from '~/components/PDSafeAreaView';
import { PDSpacing } from '~/components/PDTheme';

export const EditPoolScreen: React.FunctionComponent = () => {

    const { visible, toggleVisible } = useModal();
    const selectedPool = useTypedSelector((state) => state.selectedPool) as Pool;
    const deviceSettings = useTypedSelector((state) => state.deviceSettings) as DeviceSettings;
    const editPoolSectionInfo: EditPoolSectionInfo[] = usePoolSectionInfo(selectedPool, deviceSettings, toggleVisible);

    return (
        <PDSafeAreaView bgColor="white">
            <ScreenHeader color="blue"> Edit Pool </ScreenHeader>

                <SectionList
                    sections={ editPoolSectionInfo }
                    renderSectionHeader={ ({ section: { title } }) => (
                        <PDText type="bodyBold" style={ styles.sectionHeaderText }>
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
                    keyExtractor={ (item, index) => item.id + index }
                    stickySectionHeadersEnabled={ false }
                    contentContainerStyle={ styles.listContent }
                    style={ styles.listContainer }
                />
            <DeletePool visible={ visible } toggleVisible={ toggleVisible } />
        </PDSafeAreaView>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    listContent: {
        paddingHorizontal: PDSpacing.md,
    },
    sectionHeaderText: {
        color: '#737373',
        marginBottom: 10,
        marginTop: 15,
    },
});
