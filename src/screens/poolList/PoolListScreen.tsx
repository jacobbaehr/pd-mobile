import * as React from 'react';
import { Dimensions, Image, SectionList, StyleSheet, View } from 'react-native';
import { NavigationScreenProp, SafeAreaView } from 'react-navigation';
// @ts-ignore
import { Transition } from 'react-navigation-fluid-transitions';
import { connect } from 'react-redux';

import { images } from 'assets/images';
import { PDText } from 'components/PDText';
import { Database } from 'models/Database';
import { Pool } from 'models/Pool';
import { selectPool } from 'redux/Actions';
import { AppState, dispatch } from 'redux/AppState';

import { PoolListFooter } from './PoolListFooter';
import { PoolListItem } from './PoolListItem';

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

    componentDidMount() {
        // Fetch pools from persistent storage
        Database.prepare().then(() => {
            this.pools = Database.loadPools();
            this.setState({
                initialLoadFinished: true
            });
            this.handlePoolSelected(this.pools.values().next().value);
        }).catch((e) => {
            console.error(e);
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
        const isEmpty = pools.length === 0;
        const imageWidth = Dimensions.get('window').width;
        const imageHeight = imageWidth * 0.792;
        const imageStyles = isEmpty ? [styles.image] : [styles.image, styles.invisible];
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8F8' }} forceInset={{ bottom: 'never' }}>
                <Image
                    style={imageStyles}
                    source={images.poolListEmpty}
                    width={imageWidth}
                    height={imageHeight} />
                <View style={styles.container}>
                    <Transition appear='top'>
                        <View>
                            <PDText style={[styles.title, styles.titleTop]}>My</PDText>
                            <PDText style={[styles.title, styles.titleBottom]}>Pools</PDText>
                        </View>
                    </Transition>
                    <SectionList
                        style={{ flex: 1 }}
                        renderItem={({ item }) => <PoolListItem
                            pool={item}
                            onPoolSelected={this.handlePoolSelected} />}
                        renderSectionHeader={({ section }) => null}
                        sections={[
                            { data: pools, title: 'Pools' }
                        ]}
                        renderSectionFooter={({ section }) => <PoolListFooter
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
