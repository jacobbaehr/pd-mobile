import * as React from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { NavigationScreenProp, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import  Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Button } from '../../components/Button';
import { PoolListItem } from './PoolListItem';
import { AppState } from '../../Redux/AppState';
import { Database } from '../../Models/Database';
import { Reading } from '../../Models/Reading';
import { Pool } from '../../Models/Pool';

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
        poolsLastUpdated: state.poolsLastUpdated,
        
    }
}

interface PoolListScreenState {
    initialLoadFinished: boolean;
    isEditing: boolean;
}

class PoolListScreenComponent extends React.Component<PoolListScreenProps, PoolListScreenState> {

    pools: Realm.Results<Pool>;

    constructor(props: PoolListScreenProps) {
        super(props);

        this.state = {
            initialLoadFinished: false,
            isEditing: false
        };
    }

    static navigationOptions = (navigationOptions: any) => {
        
        const state = navigationOptions.navigation.state;
        const params = (state.params !== undefined)
            ? state.params
            : {onPressEdit: () => {}};
        return {
            title: 'Pools',
            headerRight: (
                <Button 
                    title={'Edit'}
                    onPress={() => {params.onPressEdit()}} 
                    styles={styles.editStyle}
                />
            )
        }
    }

     onPressEdit = () => {
        this.setState({
            isEditing: !this.state.isEditing
        })
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
        this.props.navigation.setParams({ onPressEdit: this.onPressEdit });
    }
    
    handlePoolSelected = (pool: Pool): void => {
        // TODO: set selected pool in Redux
        const nextScreen =  this.state.isEditing ? 'Pool' : 'ReadingList';
        this.props.navigation.navigate(nextScreen);
    }

    handleAddPoolPressed = (): void => {
        this.props.navigation.navigate('Pool');
    }

    render() {
        const pools = (this.pools === undefined) ? [] : this.pools.map(p => p);
        

        return(
            
            <View style={styles.container}>
                <SectionList
                    style={{flex:1}}
                    renderItem={({item}) => <PoolListItem pool={item} onPoolSelected={this.handlePoolSelected} />}
                    renderSectionHeader={({section}) => null }
                    sections={[
                        {data: pools, title: 'Pools'}
                    ]}
                    keyExtractor={item => (item as Pool).objectId}
                />
                <Button
                    styles={styles.button}
                    onPress={this.handleAddPoolPressed}
                    title="Add New Pool"
                    />
            </View>
        );
    }
}

export const PoolListScreen = connect(mapStateToProps)(PoolListScreenComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#070D14'
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: '#005C9E',
        height: 45,
        margin: 15
    },
    editStyle: {
        margin: 5,
        marginRight: 10,
        
    }
});
