import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { useDispatch } from 'react-redux';
import { SVG } from '~/assets/images';
import { PDText } from '~/components/PDText';
import { PDSpacing } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';
import { PDStackNavigationProps } from '~/navigator/shared';
import { clearPool } from '~/redux/selectedPool/Actions';
import { useDeviceSettings } from '~/services/DeviceSettings/Hooks';
import { DS } from '~/services/DSUtil';

import { useNavigation } from '@react-navigation/native';

export const SearchHeader : React.FC = (props) => {
    const { navigate } = useNavigation<PDStackNavigationProps>();
    const { ds } = useDeviceSettings();
    const dispatch = useDispatch();


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
                    onPress: () => navigate('Subscription'),
                    style: 'default',
                },
            ],
            { cancelable: true },
        );
    };

    const handleAddButtonPressed = () => {
        const hasUpgraded = DS.isSubscriptionValid(ds, Date.now());
        if (hasUpgraded ) {
            dispatch(clearPool());
            navigate('EditPoolNavigator');
        } else {
            promptUpgrade();
        }
    };

    const handleSettingButtonPressed = () => {
        navigate('Settings');
    };


    return (
        <PDView bgColor="white" style={ styles.containerBottom }>
            <PDView  style={ styles.container  }>
                <PDView style={ styles.sideContainer }>
                    <TouchableScale  onPress={ handleSettingButtonPressed }>
                        <SVG.IconSettings height={ 32 } width={ 32 } fill={ 'blue' } />
                    </TouchableScale>
                </PDView>
                <PDView style={ styles.centerContainer }>
                    <PDText type={ 'heading' } color="black" style={ styles.text }>
                        My Pools
                    </PDText>
                </PDView>
                <PDView style={ styles.sideContainer }>
                    <TouchableScale onPress={ handleAddButtonPressed }>
                        <SVG.IconCircleAdd height={ 32 } width={ 32 } fill={ 'blue' } />
                    </TouchableScale>
                </PDView>
            </PDView>
            <PDView style={ styles.containerSearch }>
                {props.children}
            </PDView>
        </PDView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: PDSpacing.md,
    },
    containerSearch: {
        marginHorizontal: PDSpacing.md,
        marginBottom: PDSpacing.md,
    },
    containerBottom: {
        borderBottomColor: '#EDEDED',
        borderBottomWidth: 2,
    },
    sideContainer: {
        flexShrink: 1,
        minWidth: 32,
    },
    centerContainer: {
        flexGrow: 2,
    },
    text: {
        textAlign: 'center',
    },
});