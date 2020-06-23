import * as React from 'react';
import { StyleSheet, View, SectionList, SectionListData, LayoutAnimation, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';
import { formatDistanceStrict } from 'date-fns'

import { PDNavStackParamList } from '~/navigator/Navigators';
import { images } from '~/assets/images';
import { ChartCard } from '~/components/charts/ChartCard';
import { ChartCardViewModel } from '~/components/charts/ChartCardViewModel';
import { PDText } from '~/components/PDText';
import { Pool } from '~/models/Pool';
import { User } from '~/models/User';
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

interface PoolScreenProps {
    // The id of the selected pool, if any
    selectedPool: Pool | null;

    // This is a flag that just changes whenever we save a new pool.
    poolsLastUpdated: number;

    //
    user: User | null;

    //
    hasValidSubscription: boolean;
}

const mapStateToProps = (state: AppState, ownProps: PoolScreenProps): PoolScreenProps => {
    return {
        selectedPool: state.selectedPool,
        poolsLastUpdated: state.poolsLastUpdated,
        user: state.user,
        hasValidSubscription: state.hasValidSubscription,
    };
};

const PoolScreenComponent: React.FunctionComponent<PoolScreenProps> = (props) => {

    const { navigate, goBack } = useNavigation<StackNavigationProp<PDNavStackParamList, 'PoolScreen'>>();
    const history = useRealmPoolHistoryHook(props.selectedPool?.objectId || '');
    const [selectedHistoryCellIds, setSelectedHistoryCellIds] = React.useState<string[]>([]);
    const recipe = useRecipeHook(props.selectedPool?.recipeKey || RecipeService.defaultRecipeKey);

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

    // const dateRanges = ['24H', '7D', '1M', '3M', '1Y', 'ALL'];
    const timestamps = [4, 5, 6]; // TODO: remove
    const values = [1000, 4000, 5000];
    const vm: ChartCardViewModel = {
        timestamps,
        values,
        title: 'Chlorine',
        masterId: 'a9sd8f093',
        interactive: false
    };

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
            if (!recipe) { return <View></View>; }
            const recipeNameSlop = 7;

            let lastServiceString = '';
            if (history.length > 0) {
                const lsTime = formatDistanceStrict(history[0].ts, Date.now());
                lastServiceString = `Last Serviced: ${lsTime} ago`;
            }

            contentBody =
                <View style={ styles.recipeSection } key={ `poolList|${section.data.indexOf(item)}|${sections.indexOf(section)}` }>
                    <View style={ { flexDirection: 'row' } }>
                        <TouchableScale
                            onPress={ handleChangeRecipeButtonPressed }
                            activeScale={ 0.98 }
                            hitSlop={ { top: recipeNameSlop, left: recipeNameSlop, bottom: recipeNameSlop, right: recipeNameSlop } }
                            style={ styles.recipeButton } >

                            <PDText style={ styles.recipeName }>{ recipe.name }</PDText>
                            <Image source={ images.rightArrow } height={ 21 } width={ 22 } style={ styles.arrowImage } />
                        </TouchableScale>
                    </View>
                    <BoringButton onPress={ handleStartServicePressed } title={ 'Start Service' } containerStyles={ styles.startButton } />
                    <PDText style={ styles.lastServiceLabel }>{ lastServiceString }</PDText>
                </View>;
        } else if (section.key === 'trends_section') {
            if (history.length < 2) {
                return <></>;
            }
            contentBody = <ChartCard viewModel={ vm } containerStyles={ styles.chartCard } />;
        } else if (section.key === 'history_section') {
            marginBottom = 6;
            if (history.indexOf(item) !== 0) {
                titleElement = <></>;
            }
            contentBody = <PoolHistoryListItem logEntry={ item } handleCellSelected={ handleHistoryCellPressed } isExpanded={ selectedHistoryCellIds.includes(item.objectId) } />;
        }

        return (<View style={ { marginBottom } }>
            { titleElement }
            { contentBody }
        </View>);
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
    recipeButtonText: {
        fontSize: 22,
        fontWeight: '600',
    },
    chartCard: {
        borderRadius: 24,
        marginHorizontal: 12,
        marginBottom: 12
    },
    historyButton: {
        backgroundColor: 'black',
        flex: 1,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 15,
    },
    viewMoreHistoryText: {
        color: 'white',
        fontSize: 24,
        fontWeight: '700',
        paddingVertical: 10,
        textAlign: 'center',
        fontFamily: 'Avenir Next',
    },
    plusContainer: {
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowColor: 'grey',
        shadowOpacity: 0.3,
        paddingVertical: 10,
        flex: 1,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#00C89F',
        padding: 15,
        alignItems: 'center',
        marginHorizontal: 12
    },
    pdProImageStyles: {
        margin: 10,
    },
    plusButton: {
        backgroundColor: '#E6FAF5',
        borderRadius: 25,
        shadowColor: 'transparent',
        paddingHorizontal: 12,
        marginVertical: 12
    },
    plusButtonText: {
        color: '#009B7C'
    },
    onlineBackupText: {
        color: '#9b9b9b',
        fontWeight: '400',
        fontSize: 20,
        textAlign: 'center',
    },
});
