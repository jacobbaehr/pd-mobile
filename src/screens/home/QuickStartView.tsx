import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { Animated, Dimensions, Image, StyleSheet } from 'react-native';
import { images, SVG } from '~/assets/images';
import { AV } from '~/components/animation/AnimationHelpers';
import { ButtonWithChildren } from '~/components/buttons/ButtonWithChildren';
import { PDText } from '~/components/PDText';
import { PDSpacing } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';

interface QuickStartViewProps {
    handleQuickStartPressed: () => void;
}

export const QuickStartView: React.FC<QuickStartViewProps> = (props) => {

    const a = useHomeScreenAnimation();

    const screenWidth = Dimensions.get('window').width;
    const imageHeightRatio = 0.4695;
    const imageWidth = screenWidth + 20;
    const imageHeight = imageWidth * imageHeightRatio;

    return (
        <PDView style={ styles.container }>
            <AV xy={ a.logoXY } opacity={ a.opacity }>
                <Image source={ images.homeWelcomeText } style={ styles.topText }/>
            </AV>
            <AV xy={ a.descriptionXY } opacity={ a.opacity }>
                <SVG.HomeDescriptionText style={ styles.bottomText }/>
            </AV>
            <AV x={ a.startButtonX }>
                <ButtonWithChildren onPress={ props.handleQuickStartPressed } styles={ styles.buttonContainer } hitSlop={ 5 }>
                    <SVG.IconPlayWhite height={ 21 } width={ 15 } style={ styles.buttonIcon } />
                    <PDText type="subHeading" style={ { color: 'white' } }>Quick Start</PDText>
                </ButtonWithChildren>
            </AV>
            <AV y={ a.waterY } opacity={ a.opacity } style={ [styles.waveContainer, { height: imageHeight }] } pointerEvents="none">
                <SVG.HomeWaves width={ imageWidth } height={ imageHeight }  />
            </AV>
        </PDView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topText: {
        width: 271,
        height: 45,
        marginTop: PDSpacing.xl,
        marginBottom: 0,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    bottomText: {
        marginTop: PDSpacing.xs,
        alignSelf: 'center',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: PDSpacing.sm,
        marginTop: 70,
        marginHorizontal: PDSpacing.lg,
        backgroundColor: '#1E6BFF',
        justifyContent: 'center',
        paddingTop: 9,
        paddingBottom: 9,
        borderRadius: 27.5,
    },
    buttonIcon: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginRight: PDSpacing.xs,
    },
    waveContainer: {
        marginLeft: -10,
        padding: 0,
        marginTop: 'auto',
        marginBottom: -10,
        resizeMode: 'cover',
    },
});

const useHomeScreenAnimation = () => {
    const logoXY = useRef(new Animated.ValueXY({ x: -100, y: 0 })).current;
    const descriptionXY = useRef(new Animated.ValueXY({ x: 100, y: 0 })).current;
    const startButtonX = useRef(new Animated.Value(-400)).current;
    const waterY = useRef(new Animated.Value(100)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(descriptionXY, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: true,
                    duration: 700,
                }),
                Animated.timing(logoXY, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: true,
                    duration: 700,
                }),
                Animated.timing(waterY, {
                    toValue: 0,
                    useNativeDriver: true,
                    duration: 700,
                }),
                Animated.sequence([
                    Animated.delay(100),
                    Animated.timing(opacity, {
                        toValue: 1,
                        useNativeDriver: true,
                        duration: 700,
                    }),
                ]),
            ]),
            Animated.delay(250),
            Animated.spring(startButtonX, {
                toValue: 0,
                useNativeDriver: true,
            }),
          ]).start();
    /* eslint-disable react-hooks/exhaustive-deps */
    }, []);

    return {
        logoXY,
        descriptionXY,
        startButtonX,
        waterY,
        opacity,
    };
};
