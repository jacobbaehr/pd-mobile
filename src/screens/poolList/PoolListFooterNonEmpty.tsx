import * as React from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';

import { PDText } from '~/components/PDText';
import { DeviceSettings } from '~/models/DeviceSettings';
import { AppState } from '~/redux/AppState';
import { connect } from 'react-redux';
import { DS } from '~/services/DSUtil';

interface PoolListFooterNonEmptyPropsInternal {
    deviceSettings: DeviceSettings;
}
interface PoolListFooterNonEmptyPropsExternal {
    pressedUpgrade: () => void;
}
type PoolListFooterNonEmptyProps = PoolListFooterNonEmptyPropsInternal & PoolListFooterNonEmptyPropsExternal;

const mapStateToProps = (state: AppState, ownProps: PoolListFooterNonEmptyPropsExternal): PoolListFooterNonEmptyProps => {
    return {
        ...ownProps,
        deviceSettings: state.deviceSettings
    };
};

const PoolListFooterNonEmptyComponent: React.FunctionComponent<PoolListFooterNonEmptyProps> = (props) => {

    const [isChangeButtonPressed, setIsChangeButtonPressed] = React.useState(false);
    const isPlus = DS.isSubscriptionValid(props.deviceSettings, Date.now());

    if (isPlus) { return <></>; }

    const changeButtonStyles = isChangeButtonPressed
        ? styles.recipeLinkPressed
        : styles.recipeLinkNormal;

    return (
        <View style={ styles.container }>
            <View style={ styles.topRow }>
                <TouchableHighlight
                    underlayColor={ 'transparent' }
                    onPressIn={ () => setIsChangeButtonPressed(true) }
                    onPressOut={ () => setIsChangeButtonPressed(false) }
                    onPress={ props.pressedUpgrade }>
                    <PDText style={ changeButtonStyles }>
                        Unlock
                    </PDText>
                </TouchableHighlight>
                <PDText style={ styles.changeRecipeIntro }> to add more pools.</PDText>
            </View>
        </View>
    );
}

export const PoolListFooterNonEmpty = connect(mapStateToProps)(PoolListFooterNonEmptyComponent);

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginHorizontal: 16,
        marginBottom: 40,
        backgroundColor: 'transparent',
    },
    topRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center'
    },
    changeRecipeIntro: {
        color: 'rgba(0,0,0,.6)',
        fontSize: 18
    },
    recipeLinkPressed: {
        backgroundColor: 'transparent',
        color: '#3910E8',
        fontSize: 18
    },
    recipeLinkNormal: {
        backgroundColor: 'transparent',
        color: '#3910E8',
        fontSize: 18,
        textDecorationLine: 'underline'
    },
    recipeNameIntroText: {
        color: 'rgba(0,0,0,.6)',
        fontSize: 18
    },
    recipeNameText: {
        color: 'rgba(0,0,0,.6)',
        fontWeight: '700',
        fontSize: 18
    },
    recipeDescriptionText: {
        color: 'rgba(0,0,0,.6)',
        fontSize: 18,
        marginTop: 12
    }
});