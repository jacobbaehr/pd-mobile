import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { BackButton } from '~/components/buttons/BackButton';

interface SettingsHeaderProps {
    goBack: () => void;
}

export const SettingsHeader: React.FunctionComponent<SettingsHeaderProps> = (props) => {

    return (
        <View style={ styles.container }>
            <View style={ styles.navRow }>
                <View style={ styles.backButtonContainer }>
                    <BackButton
                        title={ 'Settings' }
                        onPress={ props.goBack }
                        scale={ { scale: true, scaleLines: 2 } }
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 16,
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 2
    },
    navRow: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 12,
        marginBottom: 18
    },
    backButtonContainer: {
        flex: 1
    }
});