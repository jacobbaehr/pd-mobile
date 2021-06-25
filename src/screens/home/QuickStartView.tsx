import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { Animated, Dimensions, Image, StyleSheet, View } from 'react-native';
import { images, SVG } from '~/assets/images';
import { ButtonWithChildren } from '~/components/buttons/ButtonWithChildren';
import { PDText } from '~/components/PDText';
import { PDSpacing } from '~/components/PDTheme';
import { Haptic } from '~/services/HapticService';


export const QuickStartView: React.FC = () => {

    const startButtonXOffset = useRef(new Animated.Value(-400)).current;
    const welcomeTextPosition = useRef(new Animated.ValueXY({ x: 100, y: 0 })).current;
    const logoTextPosition = useRef(new Animated.ValueXY({ x: -100, y: 0 })).current;
    const waterPosition = useRef(new Animated.ValueXY({ x: 0, y: 100 })).current;
    const opacity = useRef(new Animated.Value(0)).current;

    const handlePressedQuickStart = () => {
        Haptic.light();
    };

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(welcomeTextPosition, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: true,
                    // easing: Easing.elastic(1),
                    duration: 700,
                }),
                Animated.timing(logoTextPosition, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: true,
                    // easing: Easing.elastic(1),
                    duration: 700,
                }),
                Animated.timing(waterPosition, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: true,
                    // easing: Easing.elastic(1),
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
            Animated.spring(startButtonXOffset, {
                toValue: 0,
                useNativeDriver: true,
            }),
          ]).start(); // start the sequence group
    /* eslint-disable react-hooks/exhaustive-deps */
    }, []);

    const screenWidth = Dimensions.get('window').width;
    const imageHeightRatio = 0.4695;
    const imageWidth = screenWidth + 20;
    const imageHeight = imageWidth * imageHeightRatio;

    return (
        <View style={ styles.container }>
            {/* Welcome title */}
            <Animated.View style={ { transform: [{ translateX: logoTextPosition.x }, { translateY: logoTextPosition.y }], opacity } }>
                <Image source={ images.homeWelcomeText } style={ styles.topText }/>
            </Animated.View>
            {/* Subtitle */}
            <Animated.View style={ { transform: [{ translateX: welcomeTextPosition.x }, { translateY: welcomeTextPosition.y }], opacity } }>
                <SVG.HomeDescriptionText style={ styles.bottomText }/>
            </Animated.View>
            {/* Start button */}
            <Animated.View style={ { transform: [{ translateX: startButtonXOffset }] } }>
                <ButtonWithChildren onPress={ handlePressedQuickStart } styles={ styles.buttonContainer } hitSlop={ 5 }>
                    <SVG.IconPlayWhite height={ 21 } width={ 15 } style={ styles.buttonIcon } />
                    <PDText type="subHeading" style={ { color: 'white' } }>Quick Start</PDText>
                </ButtonWithChildren>
            </Animated.View>
            {/* Wave graphic */}
            <Animated.View style={ [styles.waveContainer, { height: imageHeight }, { transform: [{ translateY: waterPosition.y }], opacity }] } pointerEvents="none">
                <SVG.HomeWaves width={ imageWidth } height={ imageHeight }  />
            </Animated.View>
        </View>
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
