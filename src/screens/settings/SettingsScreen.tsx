import * as React from 'react';
import { StyleSheet, View, Linking, ViewStyle } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PDNavStackParamList } from '~/navigator/Navigators';
import { connect } from 'react-redux';
import SafeAreaView, { useSafeArea } from 'react-native-safe-area-view';

import { dispatch, AppState } from '~/redux/AppState';

import { useNavigation } from '@react-navigation/native';
import { PDText } from '~/components/PDText';
import { DeviceSettings } from '~/models/DeviceSettings';
import { SettingsHeader } from './SettingsHeader';
import { ScrollView } from 'react-native-gesture-handler';
import { updateDeviceSettings } from '~/redux/deviceSettings/Actions';
import { CycleButton } from '~/components/buttons/CycleButton';
import { Config } from '~/services/Config';
import { BoringButton } from '~/components/buttons/BoringButton';
import { Upgrade } from '~/components/Upgrade';
import { DeviceSettingsService } from '~/services/DeviceSettingsService';


interface SettingsProps {
    deviceSettings: DeviceSettings;
}

const mapStateToProps = (state: AppState, ownProps: SettingsProps): SettingsProps => {
    return {
        ...ownProps,
        deviceSettings: state.deviceSettings
    };
};

const SettingsComponent: React.FunctionComponent<SettingsProps> = (props) => {

    const { goBack, navigate } = useNavigation<StackNavigationProp<PDNavStackParamList, 'Settings'>>();
    const insets = useSafeArea();
    const ds = props.deviceSettings;

    const handleGoBack = () => {
        goBack();
    }

    const handlePressedUnits = () => {
        const newUnits = (ds.units === 'metric') ? 'us' : 'metric';
        const newSettings: DeviceSettings = {
            ...ds,
            units: newUnits
        };
        dispatch(updateDeviceSettings(newSettings));
        DeviceSettingsService.saveSettings(newSettings);
    }
    const unitsText = (ds.units === 'metric') ? 'Metric' : 'US';

    const handleUpgradePressed = () => {
        navigate('Buy');
    }

    const handleForumPressed = () => {
        Linking.openURL(Config.forum_url);
    }

    const dynamicInsets: ViewStyle = {
        paddingBottom: insets.bottom
    };
    return <SafeAreaView forceInset={ { bottom: 'never' } } style={ styles.safeAreaContainer }>
        <SettingsHeader goBack={ handleGoBack } />
        <ScrollView style={ styles.scrollView }>
            <PDText style={ styles.sectionTitle }>Units</PDText>
            <View style={ styles.listContainer }>
                <PDText style={ styles.unitsTitle }>Pool Volume</PDText>
                <CycleButton
                    styles={ styles.unitsButton }
                    title={ unitsText }
                    textStyles={ styles.unitsButtonText }
                    onPress={ handlePressedUnits } />
            </View>
            <Upgrade style={ styles.upgradeContainer } onPress={ handleUpgradePressed } />
            <PDText style={ styles.sectionTitle }>Feedback?</PDText>
            <PDText style={ styles.forumDetails }>I'd love to hear it in in the forum!</PDText>
            <BoringButton
                containerStyles={ styles.button }
                textStyles={ styles.buttonText }
                onPress={ handleForumPressed }
                title="Open in Browser"
            />
            <View style={ dynamicInsets } />
        </ScrollView>
    </SafeAreaView >;
}
export const SettingsScreen = connect(mapStateToProps)(SettingsComponent);


const styles = StyleSheet.create({
    safeAreaContainer: {
        backgroundColor: 'white',
        flex: 1
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 2
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingTop: 12
    },
    listContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginHorizontal: 20,
        marginBottom: 16,
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#F0F0F0'
    },
    unitsTitle: {
        fontWeight: '600',
        fontSize: 22,
        color: 'black',
        alignSelf: 'center'
    },
    unitsButton: {
        alignSelf: 'flex-end',
        marginLeft: 'auto'
    },
    unitsButtonText: {
        fontSize: 22,
        paddingHorizontal: 7,
        paddingVertical: 4
    },
    upgradeContainer: {
        margin: 16
    },
    sectionTitle: {
        marginTop: 12,
        marginLeft: 16,
        fontSize: 28,
        fontWeight: '700',
        color: 'black'
    },
    forumDetails: {
        marginTop: 12,
        marginLeft: 24,
        fontSize: 22,
        fontWeight: '600',
        color: '#666'
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: '#DFE6F7',
        margin: 12,
        marginBottom: 24,
        shadowColor: 'transparent'
    },
    buttonText: {
        color: '#1E6BFF'
    }
});
