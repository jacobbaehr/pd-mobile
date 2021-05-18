import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScreenHeader } from '~/components/headers/ScreenHeader';
import { PDText } from '~/components/PDText';
import { PDSpacing } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';
import { useContrastStatusBar } from '~/hooks/useStatusBar';
import { PDPoolParams } from '~/navigator/EditPoolNavigator';

import { RouteProp, useRoute } from '@react-navigation/native';

import {
    EntryPoolElements, EntryPoolHelpers
} from '../editOrCreate/entryPoolValues/EntryPoolHelpers';

export interface HeaderInfo {
    id: EntryPoolElements;
    title: string;
    description: string;
}

export const PoolPopover: React.FC = () => {
    useContrastStatusBar();
    const route = useRoute<RouteProp<PDPoolParams, 'EditPoolModal'>>();
    const { headerInfo } = route.params;

    const EntryField = EntryPoolHelpers.getEntryElementById(headerInfo.id as EntryPoolElements);
    return (
        <PDView style={ styles.container } bgColor="white">
            <ScreenHeader textType="subHeading" hasBackButton hasBottomLine={ false }>
                {headerInfo.title}
            </ScreenHeader>
            <PDText type="bodyMedium" style={ styles.description } numberOfLines={ 3 }>
                {headerInfo.description}
            </PDText>
            <PDView style={ styles.content }>
                <EntryField/>
            </PDView>
        </PDView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    description: {
        color: '#737373',
        paddingVertical: PDSpacing.lg,
        textAlign: 'center',
        alignSelf: 'center',
        maxWidth: 300,
    },
    content: {
        flex: 1,
        paddingHorizontal: PDSpacing.lg,
    },
});
