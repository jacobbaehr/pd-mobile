import * as React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { NavigationScreenProp, SafeAreaView } from 'react-navigation';
// @ts-ignore
import { Transition } from 'react-navigation-fluid-transitions';
import { connect } from 'react-redux';

import { images } from 'assets/images';
import { GradientButton } from 'components/buttons/GradientButton';
import { ChartCard } from 'components/charts/ChartCard';
import { PDText } from 'components/PDText';
import { Database } from 'models/Database';
import { Pool } from 'models/Pool';
import { selectPool } from 'redux/Actions';
import { AppState, dispatch } from 'redux/AppState';

import { PoolHeaderView } from './PoolHeaderView';

interface PoolListScreenProps {
    navigation: NavigationScreenProp<{}, {}>;

    // The id of the selected pool, if any
    selectedPoolId?: string;

    // This is a flag that just changes whenever we save a new pool.
    poolsLastUpdated: number;
}

const mapStateToProps = (state: AppState, ownProps: PoolListScreenProps): PoolListScreenProps => {
    return {
        navigation: ownProps.navigation,
        selectedPoolId: state.selectedPoolId,
        poolsLastUpdated: state.poolsLastUpdated
    };
};

class PoolScreenComponent extends React.Component<PoolListScreenProps, {}> {

    pool!: Pool;

    constructor(ownProps: PoolListScreenProps) {
        super(ownProps);
        if (ownProps.selectedPoolId) {
            this.pool = Database.loadPool(ownProps.selectedPoolId);
        }
    }

    componentDidMount() {
        // Fetch pool from persistent storage
        if (this.props.selectedPoolId) {
            this.pool = Database.loadPool(this.props.selectedPoolId);
        }

        // this.props.navigation.navigate('PoolHistory');
    }

    handleBackPressed = () => {
        this.props.navigation.goBack();
    }

    // TEMP: TODO: move this
    handleDeletePoolSelected = () => {
        Database.deletePool(this.pool.objectId);
        dispatch(selectPool());
        this.props.navigation.goBack();
    }

    handleStartServicePressed = () => {
        this.props.navigation.navigate('ReadingList');
    }

    handleViewHistoryPressed = () => {
        this.props.navigation.navigate('PoolHistory');
    }

    render() {
        const dateRanges = ['24H', '7D', '1M', '3M', '1Y', 'ALL'];
        const labels = ['Jan', 'Feb', 'March'];
        const values = [1000, 4000, 5000];

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8F8' }} forceInset={{ bottom: 'never', top: 'never' }}>
                <ScrollView>
                    <PoolHeaderView pool={this.pool} style={styles.header} />
                    <View style={styles.container}>
                        <Transition appear='left'>
                            <PDText style={[styles.sectionTitle, styles.topSectionTitle]}>Service</PDText>
                        </Transition>
                        <Transition appear='right'>
                            <View>
                                <GradientButton onPress={this.handleStartServicePressed} title={'Start Service'} styles={styles.startServiceButton} />
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
                        <Transition appear='left'>
                            <View style={{ flex: 1 }}>
                                <PDText style={styles.sectionTitle}>History</PDText>
                                <ChartCard titleText={'Chlorine'} dateRangeLabels={labels} values={values}>
                                    <TouchableHighlight onPress={this.handleViewHistoryPressed} style={styles.historyButton} >
                                        <Text style={styles.viewMoreHistoryText}>View More</Text>
                                    </TouchableHighlight>
                                </ChartCard>
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
    header: {
        height: 250,
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
    startServiceButton: {
        height: 67
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
    }
});
