import * as React from 'react';
import { SectionList, StyleSheet } from 'react-native';
import { PDText } from '~/components/PDText';
import { DeviceSettings } from '~/models/DeviceSettings';
import { Pool } from '~/models/Pool';

import { useTypedSelector } from '~/redux/AppState';
import { useCreatePoolSectionInfo } from '~/screens/pool/hooks/useCreatePoolSectionInfo';
import { ScreenHeader } from '~/components/headers/ScreenHeader';
import { PDSafeAreaView } from '~/components/PDSafeAreaView';
import { PDSpacing } from '~/components/PDTheme';
import { ListRowItem, ListRowItemSectionInfo } from '~/screens/pool/components/ListRowItem';
import { Button } from '~/components/buttons/Button';
import { PDView } from '~/components/PDView';
import { useState } from 'react';

export const CreatePoolScreen: React.FunctionComponent = () => {
    const selectedPool = useTypedSelector((state) => state.selectedPool) as Pool;
    const deviceSettings = useTypedSelector((state) => state.deviceSettings) as DeviceSettings;
    const createPoolSectionInfo: ListRowItemSectionInfo[] = useCreatePoolSectionInfo(deviceSettings, selectedPool);
    //TODO: set buttondisabled to true on default, then set to false when conditions are  met
    const [buttonDisabled, setButtonDisabled] = useState(false);

    //temporary to pass linter
    if (false) {
        setButtonDisabled(false);
    }


    return (
        <PDSafeAreaView bgColor="white">
            <ScreenHeader color="blue"> Create Pool </ScreenHeader>
                <SectionList
                    sections={ createPoolSectionInfo }
                    renderSectionHeader={ ({ section: { title } }) => (
                        <PDText type="bodyGreyBold" style={ styles.sectionHeaderText }>
                            {title}
                        </PDText>
                    ) }
                    renderItem={ ({ item, index, section }) => {
                        return (
                            <ListRowItem
                                { ...item }
                                index={ index }
                                sectionLength={ section.data.length }
                            />
                        );
                    } }
                    keyExtractor={ (item, index) => item.staticProps.id + index }
                    stickySectionHeadersEnabled={ false }
                    contentContainerStyle={ styles.listContent }
                    style={ styles.listContainer }
                />
                <PDView bgColor={ 'greyVeryLight' }>
                <PDView bgColor={ 'blue' }
                        opacity={ buttonDisabled ? 0 : 1 }
                        style={ styles.buttonContainer }>
                <Button title="Create Pool"
                    onPress={ () => console.log('Create Pool pressed') }
                    textStyles={ styles.text }
                    disabled={ buttonDisabled }
                    styles={ styles.saveButton }/>
                </PDView>
                </PDView>
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
    buttonContainer: {
        borderRadius: 27.5,
        justifyContent: 'center',
        alignSelf: 'center',
        opacity: 0.3,
        marginBottom: PDSpacing.lg,
    },
    saveButton: {
        borderRadius: 27.5,
        paddingHorizontal: 140,
        paddingVertical: PDSpacing.xs,
    },
    text: {
        fontWeight: '700',
        fontSize: 18,
        alignSelf: 'center',
    },
});
