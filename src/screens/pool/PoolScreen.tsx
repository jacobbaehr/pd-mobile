import * as React from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';

import { PDNavStackParamList } from '~/navigator/Navigators';
import { images } from '~/assets/images';
import { Button } from '~/components/buttons/Button';
import { GradientButton } from '~/components/buttons/GradientButton';
import { ChartCard } from '~/components/charts/ChartCard';
import { ChartCardViewModel } from '~/components/charts/ChartCardViewModel';
import { PDText } from '~/components/PDText';
import { Pool } from '~/models/Pool';
import { User } from '~/models/User';
import { AppState } from '~/redux/AppState';
import SafeAreaView from 'react-native-safe-area-view';

import { PoolHeaderView } from './PoolHeaderView';
import { BoringButton } from '~/components/buttons/BoringButton';
import { ChoosyButton } from '~/components/buttons/ChoosyButton';

interface PoolListScreenProps {
    navigation: StackNavigationProp<PDNavStackParamList, 'PoolScreen'>;

    // The id of the selected pool, if any
    selectedPool: Pool | null;

    // This is a flag that just changes whenever we save a new pool.
    poolsLastUpdated: number;

    //
    user: User | null;

    //
    hasValidSubscription: boolean;
}

const mapStateToProps = (state: AppState, ownProps: PoolListScreenProps): PoolListScreenProps => {
    return {
        navigation: ownProps.navigation,
        selectedPool: state.selectedPool,
        poolsLastUpdated: state.poolsLastUpdated,
        user: state.user,
        hasValidSubscription: state.hasValidSubscription,
    };
};

class PoolScreenComponent extends React.Component<PoolListScreenProps> {
    handleBackPressed = () => {
        this.props.navigation.goBack();
    };

    handleStartServicePressed = () => {
        this.props.navigation.navigate('ReadingList');
    };

    handleViewHistoryPressed = () => {
        this.props.navigation.navigate('PoolHistory');
    };

    handleEditButtonPressed = () => {
        this.props.navigation.navigate('EditPool');
    };

    handleChangeRecipeButtonPressed = () => {
        this.props.navigation.navigate('RecipeList');
    };

    handleGetProPressed = () => {
        if (this.props.hasValidSubscription) {
            // Alert subscription already active
            Alert.alert('Subscription already active!');
            return;
        }

        if (!this.props.user) {
            this.props.navigation.navigate('PurchasePro', { screenType: 'Register' });
        } else {
            this.props.navigation.navigate('ConfirmPurchase', { user: this.props.user });
        }
    };

    render() {
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

        return (
            <SafeAreaView style={ { flex: 1, backgroundColor: 'white' } } forceInset={ { bottom: 'never' } } >
                <PoolHeaderView
                    pool={ this.props.selectedPool }
                    handlePressedEdit={ this.handleEditButtonPressed }
                    handlePressedBack={ this.handleBackPressed }
                />
                <ScrollView style={ styles.scrollView }>
                    <View style={ styles.container }>
                        <PDText style={ [styles.sectionTitle, styles.topSectionTitle] }>Recipe</PDText>
                        <View style={ styles.recipeSection }>
                            <View style={ { flexDirection: 'row' } }>
                                <ChoosyButton
                                    title={ 'Big 3 + Salt' }
                                    onPress={ this.handleChangeRecipeButtonPressed }
                                    styles={ styles.recipeButton }
                                    textStyles={ styles.recipeButtonText }
                                />
                            </View>
                            <BoringButton onPress={ this.handleStartServicePressed } title={ 'Start Service' } containerStyles={ styles.startButton } />
                            <PDText style={ styles.lastServiceLabel }>Last Serviced: 20 days ago</PDText>
                        </View>
                        <View style={ { flex: 1 } }>
                            <PDText style={ styles.sectionTitle }>Trends</PDText>
                            <ChartCard viewModel={ vm } containerStyles={ styles.chartCard } />
                        </View>
                        <View style={ { flex: 1 } }>
                            <PDText style={ styles.sectionTitle }>Want More?</PDText>
                            <View style={ styles.plusContainer }>
                                <Image style={ styles.pdProImageStyles } source={ images.logoGreenPlus } />
                                <Text style={ styles.onlineBackupText }>
                                    <>- Support the development of this app</>
                                    <>- Unlock a few more features.</>
                                </Text>
                                <BoringButton
                                    title={ 'Get PoolDash Plus' }
                                    onPress={ this.handleGetProPressed }
                                    containerStyles={ styles.plusButton }
                                    textStyles={ styles.plusButtonText }
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export const PoolScreen = connect(mapStateToProps)(PoolScreenComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 20,
        paddingBottom: 200,
        marginBottom: -180,
    },
    scrollView: {
        backgroundColor: '#F8F8F8',
    },
    sectionTitle: {
        fontWeight: '700',
        fontSize: 28,
        marginTop: 20,
        marginBottom: 4,
    },
    topSectionTitle: {
        marginTop: 14,
    },
    startButton: {
        backgroundColor: '#1E6BFF',
        marginTop: 12,
        marginBottom: 5
    },
    lastServiceLabel: {
        color: '#737373',
        fontWeight: '600',
        fontSize: 16
    },
    recipeSection: {
        marginHorizontal: 12,
        marginBottom: 12
    },
    recipeButton: {

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
