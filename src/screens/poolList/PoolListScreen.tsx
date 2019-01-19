import * as React from 'react';
import { View, StyleSheet, SectionList, Image, Dimensions } from 'react-native';
import { NavigationScreenProp, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
// @ts-ignore
import { Transition } from 'react-navigation-fluid-transitions';

import { Button } from '../../components/Button';
import { PoolListItem } from './PoolListItem';
import { AppState, dispatch } from '../../redux/AppState';
import { selectPool } from '../../redux/Actions';
import { Database } from '../../models/Database';
import { Pool } from '../../models/Pool';
import { PDText } from '../../components/PDText';
import { PoolListFooter } from './PoolListFooter';

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

interface PoolListScreenState {
    initialLoadFinished: boolean;
}

class PoolListScreenComponent extends React.Component<PoolListScreenProps, PoolListScreenState> {

    pools!: Realm.Results<Pool>;

    constructor(props: PoolListScreenProps) {
        super(props);

        this.state = {
            initialLoadFinished: false
        };
    }

    static navigationOptions = (navigationOptions: any) => {
        
        const state = navigationOptions.navigation.state;
        const params = (state.params !== undefined)
            ? state.params
            : {onPressEdit: () => {}};
        let isEditing = params.isEditing;
        return {
            title: 'Pools',
            headerRight: (
                <Button 
                    title={ isEditing ? 'Done' : 'Edit' }
                    onPress={() => {params.onPressEdit()}} 
                    styles={styles.editStyle}
                />
            )
        }
    }

    componentDidMount() {
        // Fetch pools from persistent storage
        Database.prepare().then(() => {
            this.pools = Database.loadPools();
            this.setState({
                initialLoadFinished: true
            });
        })
        .catch((e) => {
            console.error(e);
        });

        this.props.navigation.setParams({
            isEditing: false
        });
    }

    handlePoolSelected = (pool: Pool): void => {
        dispatch(selectPool(pool));

        const nextScreen = 'PoolScreen';
        this.props.navigation.navigate(nextScreen);
    }

    handleAddPoolPressed = (): void => {
        this.props.navigation.navigate('EditPool');
    }

    render() {
        const pools = (this.pools === undefined) ? [] : this.pools.map(p => p);
        const isEmpty = pools.length == 0;
        const imageWidth = Dimensions.get('window').width;
        const imageHeight = imageWidth * 0.792;
        const imageStyles = isEmpty ? [styles.image] : [styles.image, styles.invisible]
        return(
            <SafeAreaView style={{flex: 1, backgroundColor: '#F8F8F8'}} forceInset={{ bottom: 'never' }}>
                <Image
                    style={imageStyles} 
                    source={require('../../assets/pool_list_empty.png')}
                    width={imageWidth} 
                    height={imageHeight}/>
                <View style={styles.container}>
                    <Transition appear='top'>
                        <View>
                            <PDText style={[styles.title, styles.titleTop]}>My</PDText>
                            <PDText style={[styles.title, styles.titleBottom]}>Pools</PDText>
                        </View>
                    </Transition>
                    <SectionList
                        style={{flex:1}}
                        renderItem={({item}) => <PoolListItem
                                                    pool={item}
                                                    onPoolSelected={this.handlePoolSelected} />}
                        renderSectionHeader={({section}) => null }
                        sections={[
                            {data: pools, title: 'Pools'}
                        ]}
                        renderSectionFooter={({section}) => <PoolListFooter 
                                                                isEmpty={isEmpty} 
                                                                handlePress={this.handleAddPoolPressed} />}
                        keyExtractor={item => (item as Pool).objectId}
                        overScrollMode={'always'}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

export const PoolListScreen = connect(mapStateToProps)(PoolListScreenComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'transparent'
    },
    editStyle: {
        margin: 5,
        marginRight: 10,
    },
    title: {
        marginLeft: 12,
        fontSize: 28,
        fontWeight: 'bold'
    },
    titleBottom: {
        color: '#1E6BFF',
        marginBottom: 12
    },
    titleTop: {
        color: '#000',
        marginBottom: -3
    },
    image: {
        position: 'absolute',
        bottom: 0
    },
    invisible: {
        opacity: 0
    }
});
