import * as React from 'react';
import { StyleSheet, View, SectionList, SectionListData, LayoutAnimation, Image, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';
import { formatDistanceStrict } from 'date-fns'

import { PDNavStackParamList } from '~/navigator/Navigators';
import { images } from '~/assets/images';
import { ChartCard } from '~/components/charts/ChartCard';
import { PDText } from '~/components/PDText';
import { Pool } from '~/models/Pool';
import { AppState } from '~/redux/AppState';
import SafeAreaView from 'react-native-safe-area-view';

import { PoolHeaderView } from './PoolHeaderView';
import { BoringButton } from '~/components/buttons/BoringButton';
import { useNavigation } from '@react-navigation/native';
import { useRealmPoolHistoryHook, useRecipeHook } from '../poolList/hooks/RealmPoolHook';
import { PoolHistoryListItem } from './PoolHistoryListItem';
import { Haptic } from '~/services/HapticService';
import { Util } from '~/services/Util';
import { RecipeService } from '~/services/RecipeService';
import { DeviceSettings } from '~/models/DeviceSettings';
import { DS } from '~/services/DSUtil';
import { ChartService } from '~/services/ChartService';
import { Database } from '~/repository/Database';
import { DataService } from '~/services/DataService';
import { ExportService } from '~/services/ExportService';

interface PoolScreenProps {
    // The id of the selected pool, if any
    selectedPool: Pool | null;

    // This is a flag that just changes whenever we save a new pool.
    poolsLastUpdated: number;

    deviceSettings: DeviceSettings;
}

const mapStateToProps = (state: AppState, ownProps: PoolScreenProps): PoolScreenProps => {
    return {
        selectedPool: state.selectedPool,
        poolsLastUpdated: state.poolsLastUpdated,
        deviceSettings: state.deviceSettings
    };
};

const PoolScreenComponent: React.FunctionComponent<PoolScreenProps> = (props) => {

    const isUnlocked = DS.isSubscriptionValid(props.deviceSettings, Date.now());

    const { navigate, goBack } = useNavigation<StackNavigationProp<PDNavStackParamList, 'PoolScreen'>>();
    const history = useRealmPoolHistoryHook(props.selectedPool?.objectId || '');
    const [selectedHistoryCellIds, setSelectedHistoryCellIds] = React.useState<string[]>([]);
    const recipe = useRecipeHook(props.selectedPool?.recipeKey || RecipeService.defaultRecipeKey);
    const [chartData, setChartData] = React.useState(ChartService.loadFakeData(isUnlocked));

    React.useEffect(() => {
        if (!props.selectedPool) { return; }
        let chosen = ChartService.loadFakeData(isUnlocked);

        if (history.length > 1) {
            const allData = ChartService.loadChartData('1M', props.selectedPool, isUnlocked);
            const filtered = allData.filter(x => x.values.length >= 2);
            if (filtered.length > 0) {
                chosen = {
                    ...filtered[0],
                    interactive: false
                };
            }
        }
        setChartData(chosen);
    }, [isUnlocked, props.poolsLastUpdated]);

    if (!props.selectedPool || !recipe) {
        return <></>;
    }

    const handleBackPressed = () => {
        goBack();
    };

    const handleStartServicePressed = () => {
        navigate('ReadingList');
    };

    const handleEditButtonPressed = () => {
        navigate('EditPool');
    };

    const handleChangeRecipeButtonPressed = () => {
        navigate('RecipeList', { prevScreen: 'PoolScreen' });
    };

    const handleChartsPressed = () => {
        if (isUnlocked) {
            navigate('PoolHistory');
        } else {
            navigate('Buy');
        }
    }

    const handleHistoryCellPressed = (logEntryId: string) => {
        Haptic.light();
        const wasPreviouslyActive = selectedHistoryCellIds.includes(logEntryId);
        let newActiveIds = Util.deepCopy(selectedHistoryCellIds);
        if (wasPreviouslyActive) {
            newActiveIds = newActiveIds.filter(x => x !== logEntryId);
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
            delete: undefined
        };
        LayoutAnimation.configureNext(animationConfig);
        setSelectedHistoryCellIds(newActiveIds);
    }

    const handleHistoryCellDeletePressed = (logEntryId: string) => {
        Alert.alert(
            "Delete Log Entry?",
            "This cannot be undone.",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "DELETE",
                    onPress: () => deleteLogEntryConfirmed(logEntryId),
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    }

    const deleteLogEntryConfirmed = (logEntryId: string) => {
        setSelectedHistoryCellIds(selectedHistoryCellIds.filter(x => x !== logEntryId));
        Database.deleteLogEntry(logEntryId);
    }

    const handleDataButtonPressed = async () => {
        try {
            if (!props.selectedPool) { return; }
            const fileData = DataService.generateCsvFileForPool(props.selectedPool);
            await ExportService.shareCSVFile('pooldash.csv', fileData);
        } catch (e) {
            console.error(e);
        }
    }

    const sections: SectionListData<any>[] = [
        {
            title: 'Recipe',
            data: [{ key: 'bogus_recipe' }],
            key: 'recipe_section',
        }, {
            title: 'Trends',
            data: [{ key: 'bogus_trends' }],
            key: 'trends_section',
        }, {
            title: 'History',
            data: history,     // TODO: put the log entries here.
            key: 'history_section',
        }
    ];

    const renderItem = (section: SectionListData<any>, item: any): JSX.Element => {
        let titleElement = <PDText style={ styles.sectionTitle }>{ section.title }</PDText>;
        let contentBody = <></>;
        let marginBottom = 14;
        if (section.key === 'recipe_section') {
            if (!recipe) { return <View ></View>; }
            const hitSlop = 7;

            let lastServiceString = '';
            if (history.length > 0) {
                const lsTime = formatDistanceStrict(history[0].ts, Date.now());
                lastServiceString = `Last Serviced: ${lsTime} ago`;
            }

            contentBody =
                <View style={ styles.recipeSection }>
                    <View style={ { flexDirection: 'row' } }>
                        <TouchableScale
                            onPress={ handleChangeRecipeButtonPressed }
                            activeScale={ 0.98 }
                            hitSlop={ { top: hitSlop, left: hitSlop, bottom: hitSlop, right: hitSlop } }
                            style={ styles.recipeButton } >

                            <PDText style={ styles.recipeName }>{ recipe.name }</PDText>
                            <Image source={ images.rightArrow } height={ 21 } width={ 22 } style={ styles.arrowImage } />
                        </TouchableScale>
                    </View>
                    <BoringButton onPress={ handleStartServicePressed } title={ 'Start Service' } containerStyles={ styles.startButton } />
                    <PDText style={ styles.lastServiceLabel }>{ lastServiceString }</PDText>
                </View>;
        } else if (section.key === 'trends_section') {
            if (history.length < 1) {
                return <></>;
            }
            contentBody = <TouchableScale
                onPress={ handleChartsPressed }
                activeScale={ 0.98 }
                style={ styles.recipeButton }>

                <ChartCard
                    viewModel={ chartData }
                    containerStyles={ styles.chartCard } />
            </TouchableScale>;
        } else if (section.key === 'history_section') {
            marginBottom = 6;
            if (history.indexOf(item) !== 0) {
                titleElement = <></>;
            }
            contentBody = <PoolHistoryListItem
                logEntry={ item }
                handleCellSelected={ handleHistoryCellPressed }
                handleDeletePressed={ handleHistoryCellDeletePressed }
                isExpanded={ selectedHistoryCellIds.includes(item.objectId) } />;
        }

        // We need the key here to change after a purchase to cause a re-render:
        return (
            <View style={ { marginBottom } }>
                { titleElement }
                { contentBody }
            </View >
        );
    }

    const renderSectionFooter = (section: SectionListData<any>) => {
        if (section.key != 'history_section' || history.length === 0) {
            return <></>;
        }
        return <BoringButton
            containerStyles={ styles.dataButton }
            textStyles={ styles.dataButtonText }
            onPress={ handleDataButtonPressed }
            title="Export as CSV"
        />;
    }

    return (
        <SafeAreaView style={ { flex: 1, backgroundColor: 'white' } } forceInset={ { bottom: 'never' } } >
            <PoolHeaderView
                pool={ props.selectedPool }
                handlePressedEdit={ handleEditButtonPressed }
                handlePressedBack={ handleBackPressed }
            />
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
}

export const PoolScreen = connect(mapStateToProps)(PoolScreenComponent);

const styles = StyleSheet.create({
    sectionList: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    sectionTitle: {
        fontWeight: '700',
        fontSize: 28,
        marginTop: 6,
        marginBottom: 4,
    },
    recipeName: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1E6BFF',
        alignSelf: 'center'
    },
    arrowImage: {
        alignSelf: 'center',
        marginLeft: 8
    },
    startButton: {
        backgroundColor: '#1E6BFF',
        marginTop: 12,
        marginBottom: 5,
        marginHorizontal: 12
    },
    lastServiceLabel: {
        color: '#737373',
        fontWeight: '600',
        fontSize: 16,
        marginTop: 6
    },
    recipeSection: {
        marginBottom: 12
    },
    recipeButton: {
        flexDirection: 'row'
    },
    chartCard: {
        borderRadius: 24,
        marginHorizontal: 12,
        marginBottom: 12
    },
    dataButton: {
        alignSelf: 'stretch',
        backgroundColor: '#DFE6F7',
        marginHorizontal: 12,
        marginVertical: 24
    },
    dataButtonText: {
        color: '#1E6BFF'
    }
});
