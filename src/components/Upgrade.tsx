import React from 'react';
import { View, Image, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { images } from '~/assets/images';
import { BoringButton } from './buttons/BoringButton';
import { SubscriptionFeatures } from '~/screens/subscription/components/shared/SubscriptionFeatures';

interface UpgradeProps {
    onPress: () => void;
    style: StyleProp<ViewStyle>;
}

export const Upgrade: React.FunctionComponent<UpgradeProps> = (props) => {
    return (
        <View style={ [styles.plusContainer, props.style] }>
            <View style={ { flexDirection: 'row', display: 'flex' } }>
                <View style={ { flex: 1 } } />
                <Image
                    style={ styles.pdProImageStyles }
                    source={ images.logoGreenPlus }
                    width={ 3000 }
                    resizeMode={ 'contain' }
                />
                <View style={ { flex: 1 } } />
            </View>
            <SubscriptionFeatures showTitle={ false }/>
            <BoringButton
                title={ 'Upgrade' }
                onPress={ props.onPress }
                containerStyles={ styles.dataButton }
                textStyles={ styles.dataButtonText }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    plusContainer: {
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowColor: 'grey',
        shadowOpacity: 0.3,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flex: 1,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#1E6BFF',
        alignItems: 'center',
    },
    pdProImageStyles: {
        marginHorizontal: 10,
        flex: 4,
    },
    textContainer: {
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        marginLeft: 12,
        paddingTop: 6,
        flex: 1,
    },
    onlineBackupText: {
        // TODO: move color into the theme
        opacity: 0.6,
        marginBottom: 4,
    },
    plusButton: {
        backgroundColor: '#1E6BFF',
        borderRadius: 12,
        shadowColor: 'transparent',
        paddingHorizontal: 12,
        marginBottom: 12,
        marginTop: 16,
        alignSelf: 'stretch',
    },
    plusButtonText: {
        color: 'white',
    },
    dataButton: {
        alignSelf: 'stretch',
        backgroundColor: '#DFE6F7',
        marginHorizontal: 12,
        marginVertical: 24,
        borderRadius: 12,
        shadowColor: 'transparent',
    },
    dataButtonText: {
        color: '#1E6BFF',
    },
});
