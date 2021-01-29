import * as React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';

import { PDText } from '~/components/PDText';
import { images } from '~/assets/images';
import { PoolListFooterNonEmpty } from './PoolListFooterNonEmpty';

interface PoolListFooterProps {
    isEmpty: boolean;
    handlePressedUpgrade: () => void;
}

export const PoolListFooter: React.FunctionComponent<PoolListFooterProps> = (props) => {
    const imageWidth = Dimensions.get('window').width - 10;
    const imageHeight = imageWidth * 0.792;
    const imageStyles = {
        ...styles.image,
        height: imageHeight,
        width: imageWidth,
    };
    if (!props.isEmpty) {
        return <PoolListFooterNonEmpty pressedUpgrade={props.handlePressedUpgrade} />;
    }
    return (
        <View>
            <PDText style={styles.bottomText}>Tap the + icon above to get started.</PDText>
            <Image style={imageStyles} source={images.poolListEmpty} width={imageWidth} height={imageHeight} />
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'transparent',
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 15,
        height: 100,
        marginHorizontal: 14,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonEmpty: {
        marginTop: 0,
    },
    buttonNonEmpty: {
        opacity: 0.25,
    },
    plusText: {
        color: 'black',
        fontSize: 80,
        // marginTop: -10
    },
    bottomText: {
        color: '#3A3A3A',
        fontSize: 22,
        fontWeight: '500',
        marginHorizontal: 20,
        textAlign: 'center',
        marginTop: 100,
    },
    image: {
        alignSelf: 'center',
    },
});
