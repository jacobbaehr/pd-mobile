import * as React from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';

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
        poolsLastUpdated: state.poolsLastUpdated
    }
}

interface PoolListScreenState {
    initialLoadFinished: boolean;
}

class PoolListScreenComponent extends React.Component<PoolListScreenProps, {}> {

    pools: Realm.Results<Pool>;

    constructor(props: PoolListScreenProps) {
        super(props);

        this.state = {
            initialLoadFinished: false
        };
    }

    static navigationOptions = (navigation: any) => {
        return {
            title: 'Select a pool'
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
    }

    handlePoolSelected = (pool: Pool): void => {
        // TODO: set selected pool in Redux
        this.props.navigation.navigate('ReadingList');
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
        justifyContent: 'center',
        backgroundColor: '#060D16', 
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: 'blue',
        height: 45,
        margin: 15
    },
});
