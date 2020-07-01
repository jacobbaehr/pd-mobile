import * as React from 'react';
import { StyleSheet, View, Image, StatusBar } from 'react-native';
import { BackButton } from '~/components/buttons/BackButton';
import { images } from '~/assets/images';
import { PlatformSpecific } from '~/components/PlatformSpecific';

interface BuyHeaderProps {
    goBack: () => void;
}

export const BuyHeader: React.FunctionComponent<BuyHeaderProps> = (props) => {

    React.useEffect(() => {
        StatusBar.setBarStyle('light-content');
        return () => {
            StatusBar.setBarStyle('dark-content');
        }
    }, []);

    return (
        <View style={ styles.container }>
            <PlatformSpecific include={ ['android'] } >
                <View style={ styles.androidSpacer } />
            </PlatformSpecific>
            <View style={ styles.backButtonContainer }>
                <BackButton
                    onPress={ props.goBack }
                    scale={ { scale: true, scaleLines: 2 } }
                    color={ 'moneyGreen' }
                />
            </View>
            <View style={ { flexDirection: 'row', display: 'flex', marginTop: -40 } } pointerEvents={ 'none' }>
                <View style={ { flex: 1 } }></View>
                <Image style={ styles.pdProImageStyles } source={ images.logoGreenPlusWhite } width={ 3000 } resizeMode={ 'contain' } />
                <View style={ { flex: 1 } }></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column'
    },
    androidSpacer: {
        backgroundColor: 'transparent',
        height: 12
    },
    backButtonContainer: {
        paddingBottom: 18,
        paddingTop: 12,
        paddingLeft: 16,
    },
    pdProImageStyles: {
        margin: 10,
        marginVertical: 12,
        flex: 4,
    }
});