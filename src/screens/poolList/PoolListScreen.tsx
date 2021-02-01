import * as React from 'react';
import { Image, SectionList, StyleSheet, View, ViewStyle, Alert } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';
import { StackNavigationProp } from '@react-navigation/stack';
import { PDNavStackParamList } from '~/navigator/Navigators';
import { connect } from 'react-redux';

import { images } from '~/assets/images';
import { PDText } from '~/components/PDText';
import { Pool } from '~/models/Pool';
import { selectPool } from '~/redux/selectedPool/Actions';
import { dispatch, AppState } from '~/redux/AppState';

import { PoolListFooter } from './PoolListFooter';
import { PoolListItem } from './PoolListItem';
import { useRealmPoolsHook } from './hooks/RealmPoolHook';
import { useNavigation } from '@react-navigation/native';
import { DeviceSettings } from '~/models/DeviceSettings';
import { DS } from '~/services/DSUtil';

interface PoolListScreenProps {
    // The id of the selected pool, if any
    selectedPool: Pool | null;

    // This is a flag that just changes whenever we save a new pool.
    poolsLastUpdated: number;

    deviceSettings: DeviceSettings;
}

const mapStateToProps = (state: AppState): PoolListScreenProps => {
    return {
        selectedPool: state.selectedPool,
        poolsLastUpdated: state.poolsLastUpdated,
        deviceSettings: state.deviceSettings,
    };
};

const PoolListScreenComponent: React.FunctionComponent<PoolListScreenProps> = (props) => {
    const pools = useRealmPoolsHook();
    const { navigate } = useNavigation<StackNavigationProp<PDNavStackParamList, 'PoolList'>>();
    const insets = useSafeArea();

    const handlePoolSelected = async (pool: Pool): Promise<void> => {
        console.log('selected: ', pool);
        dispatch(selectPool(pool));
        navigate('PoolScreen');
    };

    const promptUpgrade = () => {
        Alert.alert(
            'Sorry, but...',
            'You must unlock the app to add multiple pools.',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Unlock',
                    onPress: handleUpgradePressed,
                    style: 'default',
                },
            ],
            { cancelable: true },
        );
    };

    const handleAddPoolPressed = async () => {
        const hasUpgraded = DS.isSubscriptionValid(props.deviceSettings, Date.now());
        if (hasUpgraded || pools.length == 0) {
            dispatch(selectPool(null));
            navigate('CreatePool');
        } else {
            promptUpgrade();
        }
    };

    const handleSettingsPressed = () => {
        navigate('Settings');
    };
    const handleUpgradePressed = () => {
        navigate('Buy');
    };

    const isEmpty = pools.length === 0;
    const dynamicContainerStyles: ViewStyle = {
        paddingTop: insets.top,
    };
    return (
        <View style={[styles.container, dynamicContainerStyles]}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableScale
                        style={styles.accountButton}
                        underlayColor={'transparent'}
                        activeScale={0.97}
                        onPress={handleSettingsPressed}>
                        <Image
                            style={styles.accountButtonImage}
                            source={images.gearLightButton}
                            width={38}
                            height={38}
                        />
                    </TouchableScale>
                    <PDText style={styles.title}>My Pools</PDText>
                </View>
                <View style={styles.headerRight}>
                    <TouchableScale
                        style={styles.plusButton}
                        underlayColor={'transparent'}
                        activeScale={0.97}
                        onPress={handleAddPoolPressed}>
                        <Image style={styles.plusButtonImage} source={images.plusButton} width={38} height={38} />
                    </TouchableScale>
                </View>
            </View>
            <SectionList
                style={styles.sectionList}
                renderItem={({ item }) => <PoolListItem pool={item} onPoolSelected={handlePoolSelected} />}
                renderSectionHeader={() => null}
                sections={[{ data: pools, title: 'Pools' }]}
                renderSectionFooter={() => (
                    <PoolListFooter isEmpty={isEmpty} handlePressedUpgrade={handleUpgradePressed} />
                )}
                keyExtractor={(item) => (item as Pool).objectId}
                overScrollMode={'always'}
                contentInset={{ bottom: 50 }}
            />
        </View>
    );
};

export const PoolListScreen = connect(mapStateToProps)(PoolListScreenComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'white',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 2,
    },
    headerLeft: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
    },
    headerRight: {
        display: 'flex',
        flexDirection: 'column',
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
        fontWeight: 'bold',
    },
    accountButton: {},
    accountButtonImage: {
        margin: 18,
        marginRight: 12,
    },
    plusButton: {},
    plusButtonImage: {
        margin: 18,
    },
    sectionList: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#F5F5F5',
    },
});
