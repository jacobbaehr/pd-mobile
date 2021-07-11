import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { AV } from '~/components/animation/AnimationHelpers';
import { PDText } from '~/components/PDText';
import { PDSpacing } from '~/components/PDTheme';
import { Util } from '~/services/Util';

export const CreateListHeader: React.FC = () => {
    const a = useCreateHeaderAnimation();

    return (
        <AV opacity={ a.opacity }>
            <PDText color="greyDark" type="bodyMedium" style={ styles.headerText }>
                Pooldash will pick a custom formula for your pool. Just fill out the Basic section and press "Save Pool".
            </PDText>
        </AV>
    );
};

const styles = StyleSheet.create({
    headerText: {
        textAlign: 'center',
        marginTop: PDSpacing.md,
    },
});

const useCreateHeaderAnimation = () => {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const asyncStuff = async () => {
            // Animated.delay will sometimes prevent the underlying listview from rendering the bottom rows,
            // which is bullshit.
            await Util.delay(0.7);
            Animated.timing(opacity, {
                toValue: 1,
                useNativeDriver: true,
                duration: 700,
                isInteraction: false,
            }).start();
        };
        asyncStuff();
    }, [opacity]);

    return { opacity };
};
