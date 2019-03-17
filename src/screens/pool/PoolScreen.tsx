import * as React from 'react';
import { Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { NavigationScreenProp, SafeAreaView } from 'react-navigation';
// @ts-ignore
import { Transition } from 'react-navigation-fluid-transitions';
import { connect } from 'react-redux';

import { images } from 'assets/images';
import { GradientButton } from 'components/buttons/GradientButton';
import { ChartCard } from 'components/charts/ChartCard';
import { ChartCardViewModel } from 'components/charts/ChartCardViewModel';
import { PDText } from 'components/PDText';
import { Pool } from 'models/Pool';
import { AppState } from 'redux/AppState';

import { PoolHeaderView } from './PoolHeaderView';

interface PoolListScreenProps {
    navigation: NavigationScreenProp<{}, {}>;

    // The id of the selected pool, if any
    selectedPool?: Pool;

    // This is a flag that just changes whenever we save a new pool.
    poolsLastUpdated: number;
}

const mapStateToProps = (state: AppState, ownProps: PoolListScreenProps): PoolListScreenProps => {
    return {
        navigation: ownProps.navigation,
        selectedPool: state.selectedPool,
        poolsLastUpdated: state.poolsLastUpdated
    };
};

class PoolScreenComponent extends React.Component<PoolListScreenProps> {
    private isDismissingFromScroll = false;

    handleBackPressed = () => {
        this.props.navigation.goBack();
    }

    handleStartServicePressed = () => {
        this.props.navigation.navigate('ReadingList');
    }

    handleViewHistoryPressed = () => {
        this.props.navigation.navigate('PoolHistory');
    }

    handleEditButtonPressed = () => {
        this.props.navigation.navigate('EditPool');
    }

    handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        console.log(event.nativeEvent.contentOffset.y);
        if (this.isDismissingFromScroll) { return; }

        if (event.nativeEvent.contentOffset.y < -50) {
            // this.isDismissingFromScroll = true;
            // this.props.navigation.popToTop();
        }
    }

    handleGetProPressed = () => {
        this.props.navigation.navigate('PurchasePro', { screenType: 'Register' });
    }

    render() {
        const dateRanges = ['24H', '7D', '1M', '3M', '1Y', 'ALL'];
        const timestamps = [4, 5, 6];       // TODO: remove
        const values = [1000, 4000, 5000];
        const vm: ChartCardViewModel = {
            timestamps,
            values,
            title: 'Chlorine',
            masterId: 'a9sd8f093'
        };

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8F8' }} forceInset={{ bottom: 'never', top: 'never' }}>
                <ScrollView style={{ marginBottom: 15 }}>
                    <PoolHeaderView pool={this.props.selectedPool} style={styles.header} handlePressedEdit={this.handleEditButtonPressed}/>
                    <View style={styles.container}>
                        <Transition appear='left'>
                            <PDText style={[styles.sectionTitle, styles.topSectionTitle]}>Service</PDText>
                        </Transition>
                        <Transition appear='right'>
                            <View>
                                <GradientButton onPress={this.handleStartServicePressed} title={'Start Service'}/>
                                <PDText style={styles.lastServiceLabel}>Last Serviced: 20 days ago</PDText>
                            </View>
                        </Transition>
                        <Transition appear='left'>
                            <PDText style={styles.sectionTitle}>Overview</PDText>
                        </Transition>
                        <Transition appear='right'>
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        style={styles.overviewWaterIcon}
                                        source={images.waterType}
                                        width={22}
                                        height={14} />
                                    <PDText style={styles.overviewText}>Saltwater</PDText>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        style={styles.overviewHistoryIcon}
                                        source={images.history}
                                        width={20}
                                        height={18} />
                                    <PDText style={styles.overviewText}>Big 3 + Salt</PDText>
                                </View>
                            </View>
                        </Transition>
                        <View style={{ flex: 1 }}>
                            <PDText style={styles.sectionTitle}>History</PDText>
                            <ChartCard viewModel={vm} >
                                <TouchableHighlight onPress={this.handleViewHistoryPressed} style={styles.historyButton}>
                                    <Text style={styles.viewMoreHistoryText}>View More</Text>
                                </TouchableHighlight>
                            </ChartCard>
                        </View>
                        <Transition appear='left'>
                            <View style={{ flex: 1 }}>
                                <PDText style={styles.sectionTitle}>Online Backup</PDText>
                                <View style={styles.onlineBackupContainer}>
                                    <Image style={styles.pdProImageStyles} source={images.pdProTitle} />
                                    <Text style={styles.onlineBackupText}>
                                        Get PoolDash Pro and never have to worry about dropping your phone in the pool again!
                                    </Text>
                                    <GradientButton
                                        title={'Get PoolDash Pro'}
                                        onPress={this.handleGetProPressed}
                                        gradientStart={'#fc6076'}
                                        gradientEnd={'#ff9944'}/>
                                </View>
                            </View>
                        </Transition>
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
        backgroundColor: 'transparent',
        marginHorizontal: 20
    },
    scrollView: {
        backgroundColor: '#F8F8F8'
    },
    header: {
        height: 210,
        backgroundColor: '#2091F9'
    },
    sectionTitle: {
        fontWeight: '700',
        fontSize: 28,
        marginTop: 20,
        marginBottom: 4
    },
    topSectionTitle: {
        marginTop: 14
    },
    lastServiceLabel: {
        color: '#737373',
        fontWeight: '600',
        fontSize: 16
    },
    overviewText: {
        fontSize: 22,
        fontWeight: '600',
        color: 'black',
        marginLeft: 8
    },
    overviewWaterIcon: {
        marginTop: 7
    },
    overviewHistoryIcon: {
        marginTop: 5
    },
    historyButton: {
        backgroundColor: 'black',
        flex: 1,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 15
    },
    viewMoreHistoryText: {
        color: 'white',
        fontSize: 24,
        fontWeight: '700',
        paddingVertical: 10,
        textAlign: 'center',
        fontFamily: 'Avenir Next'
    },
    onlineBackupContainer: {
        backgroundColor: 'black',
        shadowOffset: { width: 0, height: 2, },
        shadowColor: 'grey',
        shadowOpacity: 0.3,
        paddingVertical: 10,
        flex: 1,
        borderRadius: 8,
        paddingBottom: 10,
        paddingHorizontal: 15,
        alignItems: 'center'
    },
    pdProImageStyles: {
        marginBottom: 10
    },
    onlineBackupText: {
        color: '#9b9b9b',
        fontWeight: '400',
        fontSize: 20,
        textAlign: 'center'
    }
});
