import * as React from 'react';
import {
    Alert, LayoutAnimation, SectionList, SectionListData, StyleSheet, View,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';
import { BoringButton } from '~/components/buttons/BoringButton';
import { ChartCard } from '~/components/charts/ChartCard';
import { PDText } from '~/components/PDText';
import { useRealmPoolHistoryHook, useLoadRecipeHook } from '~/hooks/RealmPoolHook';
import { LogEntry } from '~/models/logs/LogEntry';
import { PDStackNavigationProps } from '~/navigator/shared';
import { useThunkDispatch, useTypedSelector } from '~/redux/AppState';
import { Database } from '~/repository/Database';
import { ChartService } from '~/services/ChartService';
import { DS } from '~/services/DSUtil';
import { EmailService } from '~/services/EmailService';
import { ExportService } from '~/services/ExportService';
import { Haptic } from '~/services/HapticService';
import { RecipeService } from '~/services/RecipeService';
import { Util } from '~/services/Util';

import { useNavigation } from '@react-navigation/native';

import { PoolHeaderView } from './PoolHeaderView';
import { PoolHistoryListItem } from './PoolHistoryListItem';
import PoolServiceConfigSection from './PoolServiceConfigSection';
import { updatePool } from '~/redux/selectedPool/Actions';

export const PoolScreen: React.FC = () => {
    const deviceSettings = useTypedSelector((state) => state.deviceSettings);
    const selectedPool = useTypedSelector((state) => state.selectedPool);
    const dispatchThunk = useThunkDispatch();

    const isUnlocked = DS.isSubscriptionValid(deviceSettings, Date.now());

    const { navigate } = useNavigation<PDStackNavigationProps>();

    // This coalesces from `Pool | undefined` to `Pool | null`
    const history = useRealmPoolHistoryHook(selectedPool?.objectId ?? null);

    const [selectedHistoryCellIds, setSelectedHistoryCellIds] = React.useState<string[]>([]);
    const [chartData, setChartData] = React.useState(ChartService.loadFakeData(isUnlocked));

    const recipe = useLoadRecipeHook(selectedPool?.recipeKey || RecipeService.defaultRecipeKey);
    const selectedRecipeKey = useTypedSelector(state => state.selectedRecipeKey);

    React.useEffect(() => {
        if (!selectedPool) {
            return;
        }
        let chosen = ChartService.loadFakeData(isUnlocked);

        const allData = ChartService.loadChartData('1M', selectedPool, isUnlocked);
        const filtered = allData.filter((x) => x.values.length >= 2);
        if (filtered.length > 0) {
            chosen = {
                ...filtered[0],
                interactive: false,
            };
        }
        setChartData(chosen);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUnlocked, history]);

    /// If the user selects a new recipe, save it to the pool.
    React.useEffect(() => {
        if (!selectedPool) { return; }

        if (selectedPool.recipeKey === selectedRecipeKey) { return; }

        dispatchThunk(
            updatePool({
                ...selectedPool,
                recipeKey: selectedRecipeKey ?? undefined,
            })
        );
    }, [selectedRecipeKey, selectedPool, dispatchThunk]);

    if (!selectedPool || !recipe) {
        return <></>;
    }

    const handleChartsPressed = () => {
        if (isUnlocked) {
            navigate('PoolHistory');
        } else {
            navigate('Buy');
        }
    };

    const handleHistoryCellPressed = (logEntryId: string) => {
        Haptic.light();
        const wasPreviouslyActive = selectedHistoryCellIds.includes(logEntryId);
        let newActiveIds = Util.deepCopy(selectedHistoryCellIds);
        if (wasPreviouslyActive) {
            newActiveIds = newActiveIds.filter((x) => x !== logEntryId);
        } else {
            newActiveIds.push(logEntryId);
        }

        // Animate the progress bar change here:
        const springAnimationProperties = {
            type: LayoutAnimation.Types.easeInEaseOut,
            property: LayoutAnimation.Properties.scaleXY,
        };
        const animationConfig = {
            duration: 50, // how long the animation will take
            create: undefined,
            update: springAnimationProperties,
            delete: undefined,
        };
        LayoutAnimation.configureNext(animationConfig);
        setSelectedHistoryCellIds(newActiveIds);
    };

    const handleHistoryCellDeletePressed = (logEntryId: string) => {
        Alert.alert(
            'Delete Log Entry?',
            'This cannot be undone.',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'DELETE',
                    onPress: () => deleteLogEntryConfirmed(logEntryId),
                    style: 'destructive',
                },
            ],
            { cancelable: true },
        );
    };

    const deleteLogEntryConfirmed = (logEntryId: string) => {
        setSelectedHistoryCellIds(selectedHistoryCellIds.filter((x) => x !== logEntryId));
        Database.deleteLogEntry(logEntryId);
    };

    const handleHistoryCellEmailPressed = (logEntry: LogEntry) => {
        EmailService.emailLogEntry(logEntry);
    };

    const handleDataButtonPressed = async () => {
        try {
            if (!selectedPool) {
                return;
            }
            await ExportService.generateAndShareCSV(selectedPool);
        } catch (e) {
            console.error(e);
        }
    };

    const renderItem = (section: SectionListData<any>, item: any): JSX.Element => {
        let titleElement = (
            <PDText type="default" style={ styles.sectionTitle }>
                {section.title}
            </PDText>
        );
        let contentBody = <></>;
        let marginHorizontal = 0;
        let marginBottom = 14;

        if (section.key === 'service_section') {
            contentBody = <PoolServiceConfigSection />;
        } else if (section.key === 'trends_section') {
            marginHorizontal = 18;
            if (history.length < 1) {
                return <></>;
            }
            contentBody = (
                <TouchableScale onPress={ handleChartsPressed } activeScale={ 0.98 } style={ styles.recipeButton }>
                    <ChartCard viewModel={ chartData } containerStyles={ styles.chartCard } />
                </TouchableScale>
            );
        } else if (section.key === 'history_section') {
            marginBottom = 6;
            marginHorizontal = 18;

            if (history.indexOf(item) !== 0) {
                titleElement = <></>;
            }
            contentBody = (
                <PoolHistoryListItem
                    key={ item.objectId }
                    logEntry={ item }
                    handleCellSelected={ handleHistoryCellPressed }
                    handleDeletePressed={ handleHistoryCellDeletePressed }
                    handleEmailPressed={ handleHistoryCellEmailPressed }
                    isExpanded={ selectedHistoryCellIds.includes(item.objectId) }
                />
            );
        }

        // We need the key here to change after a purchase to cause a re-render:
        return (
            <View key={ `${section}-${item.objectId}` } style={ { marginBottom, marginHorizontal } }>
                {section.key === 'service_section' || titleElement}
                {contentBody}
            </View>
        );
    };

    const renderSectionFooter = (section: SectionListData<any>) => {
        if (section.key !== 'history_section' || history.length === 0) {
            return <></>;
        }
        return (
            <BoringButton
                containerStyles={ styles.dataButton }
                textStyles={ styles.dataButtonText }
                onPress={ handleDataButtonPressed }
                title="Export as CSV"
            />
        );
    };

    const sections: SectionListData<any>[] = [
        {
            title: '',
            data: [{ key: 'bogus_recipe' }],
            key: 'service_section',
        },
        {
            title: 'Trends',
            data: [{ key: 'bogus_trends' }],
            key: 'trends_section',
        },
        {
            title: 'History',
            data: history,
            key: 'history_section',
        },
    ];
    return (
        <SafeAreaView style={ { flex: 1, backgroundColor: 'white' } } forceInset={ { bottom: 'never' } }>
            <PoolHeaderView />
            <SectionList
                sections={ sections }
                style={ styles.sectionList }
                renderItem={ ({ section, item }) => renderItem(section, item) }
                contentInset={ { bottom: 34 } }
                stickySectionHeadersEnabled={ true }
                keyExtractor={ (section, item) => `${section.key}|${item}|${isUnlocked ? 'unlocked' : 'locked'}` }
                renderSectionFooter={ (info) => renderSectionFooter(info.section) }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sectionList: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    sectionTitle: {
        fontWeight: '700',
        fontSize: 24,
        lineHeight: 36,
        marginTop: 6,
        marginBottom: 4,
    },
    recipeName: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1E6BFF',
        alignSelf: 'center',
    },
    arrowImage: {
        alignSelf: 'center',
        marginLeft: 8,
    },
    startButton: {
        backgroundColor: '#1E6BFF',
        marginTop: 12,
        marginBottom: 5,
        marginHorizontal: 12,
    },
    lastServiceLabel: {
        color: '#737373',
        fontWeight: '600',
        fontSize: 16,
        marginTop: 6,
    },
    recipeSection: {
        marginBottom: 12,
    },
    recipeButton: {
        flexDirection: 'row',
    },
    chartCard: {
        borderRadius: 24,
        marginHorizontal: 12,
        marginBottom: 12,
    },
    dataButton: {
        alignSelf: 'stretch',
        backgroundColor: '#DFE6F7',
        marginHorizontal: 12,
        marginVertical: 24,
    },
    dataButtonText: {
        color: '#1E6BFF',
    },
});
