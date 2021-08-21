import React from 'react';
import { SectionList as RnSectionList, SectionListData, StyleSheet } from 'react-native';
import { ForumPrompt } from '~/screens/home/footer/ForumPrompt';

import { PDText } from '../PDText';
import { PDColor, PDSpacing, useTheme } from '../PDTheme';
import { PDSectionItemList } from './PDSectionItemList';

// TODO: Use generics to identify the id
export interface PDSectionListItemProps {
    id: string;
    value?: string | null;
    label: string;
    image: string;
    onPress: () => void;
    valueColor: PDColor;
}

export interface PDSectionListProps {
    title: string;
    data: PDSectionListItemProps[];
}

interface SectionListProps {
    sections: SectionListData<PDSectionListItemProps, PDSectionListProps>[];
    showFooter: boolean;
}

export const PDSectionList: React.FC<SectionListProps> = (props) => {
    const { sections, showFooter } = props;
    const footerComponent = showFooter ? <ForumPrompt /> : <></>;
    const theme = useTheme();

    return (
        <RnSectionList
            sections={ sections }
            renderSectionHeader={ ({ section: { title } }) => (
                <PDText type="bodyBold" color="greyDark" style={ styles.sectionHeaderText }>
                    {title}
                </PDText>
            ) }
            renderItem={ ({ item, index, section }) => (
                <PDSectionItemList item={ item } index={ index } sectionLength={ section.data.length } />
            ) }
            keyExtractor={ (item, index) => item.id + index }
            stickySectionHeadersEnabled={ false }
            contentContainerStyle={ styles.listContent }
            style={ [styles.listContainer, { backgroundColor: theme.colors.greyLightest  }] }
            ListFooterComponent={ footerComponent }
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: PDSpacing.md,
    },
    sectionHeaderText: {
        marginBottom: PDSpacing.md,
        marginTop: PDSpacing.lg,
        textTransform: 'uppercase',
    },
});
