import * as React from 'react';
import { Image, Linking, StyleSheet, View, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SafeAreaView, { useSafeArea } from 'react-native-safe-area-view';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';
import { images } from '~/assets/images';
import { BoringButton } from '~/components/buttons/BoringButton';
import { CycleButton } from '~/components/buttons/CycleButton';
import { PDText } from '~/components/PDText';
import { Upgrade } from '~/components/Upgrade';
import { DeviceSettings } from '~/models/DeviceSettings';
import { getDisplayForPoolValue } from '~/models/Pool/PoolUnit';
import { Scoop } from '~/models/Scoop';
import { PDStackNavigationProps } from '~/navigator/shared';
import { dispatch, useTypedSelector } from '~/redux/AppState';
import { updateDeviceSettings } from '~/redux/deviceSettings/Actions';
import { Config } from '~/services/Config';
import { DeviceSettingsService } from '~/services/DeviceSettingsService';
import { DS } from '~/services/DSUtil';
import { ExportService } from '~/services/ExportService';
import { Haptic } from '~/services/HapticService';
import { VolumeUnitsUtil } from '~/services/VolumeUnitsUtil';

import { useNavigation } from '@react-navigation/native';

import { ScoopListItem } from './scoops/ScoopListItem';
import { SettingsHeader } from './SettingsHeader';

export const SettingsScreen: React.FC = () => {
    const { goBack, navigate } = useNavigation<PDStackNavigationProps>();
    const insets = useSafeArea();
    const ds = useTypedSelector((state) => state.deviceSettings);
    const isUnlocked = DS.isSubscriptionValid(ds, Date.now());

    const handleGoBack = () => {
        goBack();
    };

    const handlePressedUnits = () => {
        const newUnits = VolumeUnitsUtil.getNextUnitValue(ds.units);
        const newSettings: DeviceSettings = {
            ...ds,
            units: newUnits,
        };
        dispatch(updateDeviceSettings(newSettings));
        DeviceSettingsService.saveSettings(newSettings);
    };

    const handleUpgradePressed = () => {
        navigate('Buy');
    };

    const handleForumPressed = () => {
        Linking.openURL(Config.forum_url);
    };

    const handleDataButtonPressed = async () => {
        try {
            await ExportService.generateAndShareCSV(null);
        } catch (e) {
            console.error(e);
        }
    };

    const handleAddScoopPressed = () => {
        Haptic.medium();
        navigate('ScoopDetails', { prevScoop: null });
    };

    const handlePressedScoop = (scoop: Scoop) => {
        navigate('ScoopDetails', { prevScoop: scoop });
    };

    const getScoops = () => {
        return ds.scoops.map((scoop) => (
            <ScoopListItem scoop={ scoop } handlePressedScoop={ handlePressedScoop } key={ scoop.guid } />
        ));
    };

    const dynamicInsets: ViewStyle = {
        paddingBottom: insets.bottom,
    };

    const hitSlop = 5;
    const unitsText = getDisplayForPoolValue(ds.units) as string;

    return (
        <SafeAreaView forceInset={ { bottom: 'never' } } style={ styles.safeAreaContainer }>
            <SettingsHeader goBack={ handleGoBack } />
            <ScrollView style={ styles.scrollView }>
                <PDText type="default" style={ styles.sectionTitle }>
                    Units
                </PDText>
                <View style={ styles.listItemContainer }>
                    <PDText type="default" style={ styles.unitsTitle }>
                        Pool Volume
                    </PDText>
                    <CycleButton
                        styles={ styles.unitsButton }
                        title={ unitsText }
                        textStyles={ styles.unitsButtonText }
                        onPress={ handlePressedUnits }
                    />
                </View>
                <View style={ styles.addScoopSectionHeader }>
                    <PDText type="default" style={ styles.sectionTitle }>
                        Scoops
                    </PDText>
                    <TouchableScale
                        style={ styles.addScoopButtonContainer }
                        activeScale={ 0.97 }
                        onPress={ handleAddScoopPressed }
                        hitSlop={ { top: hitSlop, left: hitSlop, bottom: hitSlop, right: hitSlop } }>
                        <Image style={ styles.addScoopButtonImage } source={ images.plusButton } width={ 32 } height={ 32 } />
                    </TouchableScale>
                </View>
                {getScoops()}

                <PDText type="default" style={ styles.sectionTitle }>
                    {isUnlocked ? 'Subscription' : 'Unlock'}
                </PDText>
                <Upgrade style={ styles.upgradeContainer } onPress={ handleUpgradePressed } isUnlocked={ isUnlocked } />
                <PDText type="default" style={ styles.sectionTitle }>
                    Data Export
                </PDText>
                <PDText type="default" style={ styles.forumDetails }>
                    This will create a .csv file with all of the history for all of your pools.
                </PDText>
                <BoringButton
                    containerStyles={ styles.dataButton }
                    textStyles={ styles.dataButtonText }
                    onPress={ handleDataButtonPressed }
                    title="Export as CSV"
                />
                <PDText type="default" style={ styles.sectionTitle }>
                    Feedback?
                </PDText>
                <PDText type="default" style={ styles.forumDetails }>
                    I'd love to hear it in in the forum!
                </PDText>
                <BoringButton
                    containerStyles={ styles.dataButton }
                    textStyles={ styles.dataButtonText }
                    onPress={ handleForumPressed }
                    title="Open in Browser"
                />
                <View style={ dynamicInsets } />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        backgroundColor: 'white',
        flex: 1,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 2,
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingTop: 12,
    },
    listItemContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginHorizontal: 20,
        marginBottom: 16,
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#F0F0F0',
    },
    unitsTitle: {
        fontWeight: '600',
        fontSize: 22,
        color: 'black',
        alignSelf: 'center',
    },
    unitsButton: {
        alignSelf: 'flex-end',
        marginLeft: 'auto',
    },
    unitsButtonText: {
        fontSize: 22,
        paddingHorizontal: 7,
        paddingVertical: 4,
    },
    addScoopSectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    addScoopButtonContainer: {
        marginRight: 28,
        marginTop: 'auto',
    },
    addScoopButtonImage: {},
    upgradeContainer: {
        marginVertical: 16,
        marginHorizontal: 28,
    },
    sectionTitle: {
        marginTop: 12,
        marginLeft: 16,
        fontSize: 28,
        fontWeight: '700',
        color: 'black',
    },
    dataButton: {
        alignSelf: 'stretch',
        backgroundColor: '#DFE6F7',
        margin: 12,
        marginBottom: 24,
    },
    dataButtonText: {
        color: '#1E6BFF',
    },
    forumDetails: {
        marginTop: 12,
        marginLeft: 24,
        fontSize: 22,
        fontWeight: '600',
        color: '#666',
    },
    forumButton: {
        alignSelf: 'stretch',
        backgroundColor: '#2c5fff',
        margin: 12,
        marginBottom: 24,
        shadowColor: 'transparent',
    },
    forumButtonText: {},
});
