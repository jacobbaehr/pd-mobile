import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { images } from '~/assets/images';
import { AV } from '~/components/animation/AnimationHelpers';
import { PDText } from '~/components/PDText';
import { PDSpacing } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';
import { useDeviceSettings } from '~/services/DeviceSettings/Hooks';
import { DS } from '~/services/DSUtil';
import { Util } from '~/services/Util';


interface PoolListFooterNonEmptyProps {
    pressedUpgrade: () => void;
    numPools: number;
}

export const PoolListFooterUpgrade: React.FunctionComponent<PoolListFooterNonEmptyProps> = (props) => {
    const [isChangeButtonPressed, setIsChangeButtonPressed] = React.useState(false);
    const { ds } = useDeviceSettings();
    const isPlus = DS.isSubscriptionValid(ds, Date.now());
    const a = useAnimation(props.numPools);

    if (isPlus) {
        // I don't know if this is necessary:
        const imageWidth = Dimensions.get('window').width - 20;
        const imageHeight = imageWidth * 0.3108;
        return (
            <AV opacity={ a.opacity } style={ { alignSelf: 'center' } }>
                <Image
                    style={ styles.image }
                    source={ images.logoGreenPlus }
                    width={ imageWidth }
                    height={ imageHeight }
                    resizeMode={ 'contain' }
                />
            </AV>
        );
    }

    const toggleChangeButtonPressed = () => {
        setIsChangeButtonPressed(!isChangeButtonPressed);
    };

    return (
        <AV opacity={ a.opacity }>
            <PDView bgColor="transparent" style={ styles.container } >
                <PDView style={ styles.topRow }>
                    <TouchableOpacity
                        onPressIn={ toggleChangeButtonPressed }
                        onPressOut={ toggleChangeButtonPressed }
                        onPress={ props.pressedUpgrade }>
                        <PDText type="default" style={ Util.excludeFalsy([styles.recipeLinkNormal, isChangeButtonPressed && styles.recipeLinkPressed]) }>
                            Upgrade
                        </PDText>
                    </TouchableOpacity>
                    <PDText type="default" color="greyDark" style={ styles.changeRecipeIntro }>
                        {' '} to add more pools.
                    </PDText>
                </PDView>
            </PDView>
        </AV>
    );
};


const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginHorizontal: PDSpacing.md,
        marginBottom: 40,
    },
    topRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
    },
    changeRecipeIntro: {
        fontSize: 18,
    },
    recipeLinkPressed: {
        textDecorationLine: 'none',
    },
    recipeLinkNormal: {
        backgroundColor: 'transparent',
        color: '#3910E8',
        fontSize: 18,
        textDecorationLine: 'underline',
    },
    image: {
        marginTop: 10,
        maxWidth: 250,
        alignSelf: 'center',
    },
});

const useAnimation = (numPools: number) => {
    const opacity = useRef(new Animated.Value(0)).current;

    const additionalDelayForStaggeredPools = numPools * 150;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(350 + additionalDelayForStaggeredPools),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
          ]).start();
    /* eslint-disable react-hooks/exhaustive-deps */
    }, []);

    return {
        opacity,
    };
};
