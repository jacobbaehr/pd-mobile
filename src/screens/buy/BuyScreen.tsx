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
import { CycleButton } from '~/components/buttons/CycleButton';
import { Config } from '~/services/Config';
import { BoringButton } from '~/components/buttons/BoringButton';
import { Upgrade } from '~/components/Upgrade';
import { BuyHeader } from './BuyHeader';
import { images } from '~/assets/images';
import { lifeStory } from './LifeStory';


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

    const ds = props.deviceSettings;

    const handleGoBack = () => {
        goBack();
    }

    const handlePressedUnits = () => {
        const newUnits = (ds.units === 'metric') ? 'us' : 'metric';
        dispatch(updateDeviceSettings({
            ...ds,
            units: newUnits
        }));
    }
    const unitsText = (ds.units === 'metric') ? 'Metric' : 'US';

    const handleUpgradePressed = () => {
        console.log('money');
    }
    const handleRestorePressed = () => {
        console.log('restoring money');
    }

    const handleForumPressed = () => {
        Linking.openURL(Config.forum_url);
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
                <PDText style={ styles.reasonText }>Charts and Trends</PDText>
            </View>
            <View style={ [styles.flexRow, styles.reasonTop] }>
                <Image style={ styles.reasonIcon } source={ images.pools3 } width={ 37 } height={ 27 } />
                <PDText style={ styles.reasonText }>Unlimited Pools</PDText>
            </View>
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
