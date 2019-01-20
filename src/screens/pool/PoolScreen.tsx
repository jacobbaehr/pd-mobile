import * as React from 'react';
// @ts-ignore
import { Transition } from 'react-navigation-fluid-transitions';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { NavigationScreenProp, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { AppState, dispatch } from '../../redux/AppState';
import { selectPool } from '../../redux/Actions';
import { Database } from '../../models/Database';
import { Pool } from '../../models/Pool';
import { PDText } from '../../components/PDText';
import { GradientButton } from '../../components/GradientButton';
import { PoolHeaderView } from './PoolHeaderView';

import { PDNavFluid } from '../../navigator/App';

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
    }
}

class PoolScreenComponent extends React.Component<PoolListScreenProps, {}> {

    pool!: Pool;

    constructor(ownProps: PoolListScreenProps) {
        super(ownProps);
        if (ownProps.selectedPoolId != undefined) {
            this.pool = Database.loadPool(ownProps.selectedPoolId);
        }
    }

    componentDidMount() {
        // Fetch pool from persistent storage
        if (this.props.selectedPoolId != undefined) {
            this.pool = Database.loadPool(this.props.selectedPoolId);
        }
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

    render() {
        return(
            <SafeAreaView style={{flex: 1, backgroundColor: '#F8F8F8'}} forceInset={{ bottom: 'never', top: 'never' }}>
                <PoolHeaderView pool={this.pool} style={styles.header} />
                <View style={styles.container}>
                    <Transition appear='left'>
                        <PDText style={[styles.sectionTitle, styles.topSectionTitle]}>Service</PDText>
                    </Transition>
                    <Transition appear='right'>
                        <View style={styles.serviceContainer}>
                            <GradientButton onPress={ this.handleStartServicePressed } title={'Start Service'} styles={styles.startServiceButton} />
                            <PDText style={styles.lastServiceLabel}>Last Serviced: 20 days ago</PDText>
                        </View>
                    </Transition>
                    <Transition appear='left'>
                        <PDText style={styles.sectionTitle}>Overview</PDText>
                    </Transition>
                    <Transition appear='right'>
                        <View style={styles.serviceContainer}>
                            <View style={{flexDirection: 'row'}}>
                                <Image
                                    style={styles.overviewWaterIcon}
                                    source={require('../../assets/water_type.png')}
                                    width={22}
                                    height={14}/>
                                <PDText style={styles.overviewText}>Saltwater</PDText>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Image
                                    style={styles.overviewHistoryIcon}
                                    source={require('../../assets/history.png')}
                                    width={20}
                                    height={18}/>
                                <PDText style={styles.overviewText}>Big 3 + Salt</PDText>
                            </View>
                        </View>
                    </Transition>
                    <Transition appear='left'>
                        <PDText style={styles.sectionTitle}>History</PDText>
                    </Transition>
                    <Transition appear='right'>
                    <GradientButton onPress={() => {this.handleDeletePoolSelected}} title={'Delete Pool'} styles={styles.startServiceButton} />
                    </Transition>
                </View>
                <GradientButton onPress={this.handleDeletePoolSelected} title={'Delete Pool'} styles={{}} />
            </SafeAreaView>
        );
    }
}

export const PoolScreen = connect(mapStateToProps)(PoolScreenComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'transparent'
    },
    header: {  
        height: 250,
        backgroundColor: '#2091F9'
    },
    sectionTitle: {
        fontWeight: '700',
        fontSize: 28,
        marginHorizontal: 16,
        marginTop: 20,
        marginBottom: 4
    },
    topSectionTitle: {
        marginTop: 14
    },
    serviceContainer: {
        marginHorizontal: 16
    },
    startServiceButton: {
        height: 67,
        paddingHorizontal: 6
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
    }
});
