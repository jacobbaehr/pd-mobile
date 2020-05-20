import * as React from 'react';
import { Image, SectionList, StyleSheet, View, SafeAreaView } from 'react-native';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';
import { StackNavigationProp } from '@react-navigation/stack';
import { PDNavStackParamList } from '~/navigator/Navigators';
import { connect } from 'react-redux';

import { images } from '~/assets/images';
import { PDText } from '~/components/PDText';
import { Pool } from '~/models/Pool';
import { User } from '~/models/User';
import { selectPool } from '~/redux/selectedPool/Actions';
import { dispatch, AppState } from '~/redux/AppState';

import { PoolListFooter } from './PoolListFooter';
import { PoolListItem } from './PoolListItem';
import { useRealmPoolsHook } from './hooks/RealmPoolHook';
import { useNavigation } from '@react-navigation/native';
import { createIconSetFromFontello } from 'react-native-vector-icons';

interface PoolListScreenProps {
    navigation: StackNavigationProp<PDNavStackParamList, 'PoolList'>;

    // The id of the selected pool, if any
    selectedPool: Pool | null;

    // This is a flag that just changes whenever we save a new pool.
    poolsLastUpdated: number;

    user: User | null;
}

const mapStateToProps = (state: AppState, ownProps: PoolListScreenProps): PoolListScreenProps => {
    return {
        navigation: ownProps.navigation,
        selectedPool: state.selectedPool,
        poolsLastUpdated: state.poolsLastUpdated,
        user: state.user
    };
};

interface PoolListScreenState {
    initialLoadFinished: boolean;
}

const PoolListScreenComponent: React.FunctionComponent<PoolListScreenProps> = (props) => {

    const pools = useRealmPoolsHook();
    const { navigate } = useNavigation();

    const handlePoolSelected = async (pool: Pool): Promise<void> => {
        console.log('selected: ', pool);
        dispatch(selectPool(pool));
        navigate('PoolScreen');
    }

    const handleAddPoolPressed = async () => {
        dispatch(selectPool(null));
        navigate('CreatePool');
    }

    const isEmpty = pools.length === 0;
    return (
        <SafeAreaView style={ { flex: 1, backgroundColor: '#FFFFFF' } } >
            <View style={ styles.container }>
                <View style={ styles.header }>
                    <View style={ styles.headerLeft }>
                        <TouchableScale
                            style={ styles.accountButton }
                            underlayColor={ 'transparent' }
                            activeScale={ 0.97 }
                            onPress={ handleAddPoolPressed }>
                            <Image
                                style={ styles.accountButtonImage }
                                source={ images.accountButton }
                                width={ 38 }
                                height={ 38 } />
                        </TouchableScale>
                        <PDText style={ styles.title }>My Pools</PDText>
                    </View>
                    <View style={ styles.headerRight }>
                        <TouchableScale
                            style={ styles.plusButton }
                            underlayColor={ 'transparent' }
                            activeScale={ 0.97 }
                            onPress={ handleAddPoolPressed }>
                            <Image
                                style={ styles.plusButtonImage }
                                source={ images.plusButton }
                                width={ 38 }
                                height={ 38 } />
                        </TouchableScale>
                    </View>
                </View>
                <SectionList
                    style={ styles.sectionList }
                    renderItem={ ({ item }) => <PoolListItem
                        pool={ item }
                        onPoolSelected={ handlePoolSelected } /> }
                    renderSectionHeader={ () => null }
                    sections={ [
                        { data: pools, title: 'Pools' }
                    ] }
                    renderSectionFooter={ () => <PoolListFooter
                        isEmpty={ isEmpty }
                        handlePress={ handleAddPoolPressed } /> }
                    keyExtractor={ item => (item as Pool).objectId }
                    overScrollMode={ 'always' } />
            </View>
        </SafeAreaView>
    );
}

export const PoolListScreen = connect(mapStateToProps)(PoolListScreenComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'transparent'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    headerLeft: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1
    },
    headerRight: {
        display: 'flex',
        flexDirection: 'column'
    },
    editStyle: {
        margin: 5,
        marginRight: 10,
    },
    title: {
        color: '#1E6BFF',
        // marginLeft: 12,
        marginTop: 18,
        fontSize: 28,
        fontWeight: 'bold'
    },
    accountButton: {

    },
    accountButtonImage: {
        margin: 18,
        marginRight: 12
    },
    plusButton: {
    },
    plusButtonImage: {
        margin: 18
    },
    sectionList: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#F5F5F5'
    }
});
