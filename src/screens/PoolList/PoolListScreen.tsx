import * as React from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { NavigationScreenProp, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import  Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Button } from '../../components/Button';
import { PoolListItem } from './PoolListItem';
import { AppState, dispatch } from '../../Redux/AppState';
import { selectPool } from '../../Redux/Actions';
import { Database } from '../../Models/Database';
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

    pools!: Realm.Results<Pool>;

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

     onPressEdit = () => {
        const isEditing = !this.state.isEditing;

        // Re-renders the screen
        this.setState({ isEditing });

        // Re-renders the navbar (because React-Navigation is remarkably unintuitive)
        this.props.navigation.setParams({ isEditing });
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
            isEditing: false,
            onPressEdit: this.onPressEdit
        });
    }

    
    handlePoolSelected = (pool: Pool): void => {
        dispatch(selectPool(pool));

        const nextScreen =  this.state.isEditing ? 'Pool' : 'RecipeList';
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
                    renderItem={({item}) => <PoolListItem isEditing={this.state.isEditing} pool={item} onPoolSelected={this.handlePoolSelected} />}
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
