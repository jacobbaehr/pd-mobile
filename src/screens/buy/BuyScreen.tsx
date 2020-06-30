import * as React from 'react';
import { StyleSheet, View, Linking, Image, ViewStyle } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PDNavStackParamList } from '~/navigator/Navigators';
import { connect } from 'react-redux';
import SafeAreaView, { useSafeArea } from 'react-native-safe-area-view';

import { dispatch, AppState } from '~/redux/AppState';

import { useNavigation } from '@react-navigation/native';
import { PDText } from '~/components/PDText';
import { DeviceSettings } from '~/models/DeviceSettings';

import { ScrollView } from 'react-native-gesture-handler';
import { updateDeviceSettings } from '~/redux/deviceSettings/Actions';
import { BoringButton } from '~/components/buttons/BoringButton';
import { BuyHeader } from './BuyHeader';
import { images } from '~/assets/images';
import { lifeStory } from './LifeStory';
import { IAP, PurchaseStatus } from '~/services/IAP';
import { DeviceSettingsService } from '~/services/DeviceSettingsService';
import { DS } from '~/services/DSUtil';


interface BuyScreenProps {
    deviceSettings: DeviceSettings;
}

const mapStateToProps = (state: AppState, ownProps: BuyScreenProps): BuyScreenProps => {
    return {
        ...ownProps,
        deviceSettings: state.deviceSettings
    };
};

const BuyComponent: React.FunctionComponent<BuyScreenProps> = (props) => {

    const { goBack } = useNavigation<StackNavigationProp<PDNavStackParamList, 'Buy'>>();
    const insets = useSafeArea();
    const [isLoading, setIsLoading] = React.useState(false);
    const isPurchased = DS.isSubscriptionValid(props.deviceSettings, Date.now());

    const handleGoBack = () => {
        goBack();
    }

    const handleUpgradePressed = async () => {
        setIsLoading(true);

        const purchaseResult = await IAP.purchaseUnlock();
        handlePurchaseResult(purchaseResult);
    }
    const handleRestorePressed = async () => {
        setIsLoading(true);

        const purchaseResult = await IAP.restoreUnlock();
        handlePurchaseResult(purchaseResult);
    }
    const handleManageSubPressed = async () => {
        const url = await IAP.getManagementURL();
        if (url) {
            Linking.openURL(url);
        } else {
            Linking.openSettings();
        }
    }
    const handlePurchaseResult = (ps: PurchaseStatus) => {
        console.log('PS', JSON.stringify(ps));
        if (ps instanceof Date) {
            console.log('1');
            const now = new Date();
            if (ps > now) {
                console.log('2');
                // update device settings to indicate the date of the expiration.
                const ds = {
                    ...props.deviceSettings,
                    sub_exp: ps.getTime()
                };
                DeviceSettingsService.saveSettings(ds);
                dispatch(updateDeviceSettings(ds));
                console.log('3');
            }
        }
        // TODO: alert the user of the different states? Maybe.
        setIsLoading(false);
    }

    const getButtons = () => {
        if (isPurchased) {
            return <BoringButton
                onPress={ handleManageSubPressed }
                title={ 'Manage Subscription' }
                containerStyles={ styles.purchaseButtonContainer }
                textStyles={ styles.purchaseButtonText } />;
        }
        return <>
            <BoringButton
                onPress={ handleUpgradePressed }
                title={ 'Purchase' }
                containerStyles={ styles.purchaseButtonContainer }
                textStyles={ styles.purchaseButtonText } />
            <BoringButton
                onPress={ handleRestorePressed }
                title={ 'Restore' }
                containerStyles={ styles.restoreButtonContainer }
                textStyles={ styles.restoreButtonText } />
        </>;
    }

    const dynamicInsets: ViewStyle = {
        paddingBottom: insets.bottom
    };
    return <SafeAreaView forceInset={ { bottom: 'never' } } style={ styles.safeAreaContainer }>
        <BuyHeader goBack={ handleGoBack } />
        <ScrollView style={ [styles.scrollView, dynamicInsets] }>
            <View style={ styles.flexRow }>
                <PDText style={ styles.title }>Unlock</PDText>
                <PDText style={ styles.price }>$20</PDText>
            </View>
            <View style={ styles.underline } />
            <View style={ styles.flexRow }>
                <PDText style={ styles.annually }>annually</PDText>
            </View>
            <View style={ [styles.flexRow, styles.reasonTop] }>
                <Image style={ styles.reasonIcon } source={ images.trends } width={ 37 } height={ 27 } />
                <PDText style={ styles.reasonText }>Charts</PDText>
            </View>
            <View style={ [styles.flexRow, styles.reasonTop] }>
                <Image style={ styles.reasonIcon } source={ images.pools3 } width={ 37 } height={ 27 } />
                <PDText style={ styles.reasonText }>Unlimited Pools</PDText>
            </View>
            <View
                pointerEvents={ isLoading ? 'none' : 'auto' }
                style={ { opacity: isLoading ? 0.6 : 1 } }>
                { getButtons() }
            </View>
            <PDText style={ styles.lifeStory }>{ lifeStory }</PDText>
            <View style={ dynamicInsets } />
        </ScrollView>
    </SafeAreaView >;
}
export const BuyScreen = connect(mapStateToProps)(BuyComponent);


const styles = StyleSheet.create({
    safeAreaContainer: {
        backgroundColor: 'black',
        flex: 1
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 32,
        paddingHorizontal: 24
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    title: {
        color: 'white',
        fontWeight: '700',
        fontSize: 28
    },
    price: {
        color: '#02CFFF',
        alignSelf: 'flex-end',
        marginLeft: 'auto',
        fontWeight: '700',
        fontSize: 28
    },
    underline: {
        backgroundColor: '#343434',
        height: 2,
        marginHorizontal: 6,
        flex: 1
    },
    annually: {
        color: '#9B9B9B',
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Italic',
        alignSelf: 'flex-end',
        marginLeft: 'auto'
    },
    reasonTop: {
        marginTop: 19
    },
    reasonIcon: {
        width: 42,
        height: 42
    },
    reasonText: {
        marginLeft: 16,
        color: '#CCC',
        fontSize: 24,
        fontWeight: '600'
    },
    purchaseButtonContainer: {
        alignSelf: 'stretch',
        marginHorizontal: 6,
        marginTop: 24,
        backgroundColor: '#1CD0FF',
        borderRadius: 18
    },
    purchaseButtonText: {
        color: 'black',
        fontWeight: '700',
        fontSize: 24
    },
    restoreButtonContainer: {
        alignSelf: 'stretch',
        marginHorizontal: 6,
        marginTop: 12,
        backgroundColor: 'transparent'
    },
    restoreButtonText: {
        color: '#CCC',
        fontWeight: '700',
        fontSize: 22
    },
    lifeStory: {
        color: '#CCC',
        fontSize: 22,
        marginBottom: 24
    }
});
