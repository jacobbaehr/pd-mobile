import * as React from 'react';
import { Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';

import { images } from '~/assets/images';

interface CloseButtonProps {
    onPress: () => void;
    containerStyle?: StyleProp<ViewStyle>;
}

export const CloseButton: React.FunctionComponent<CloseButtonProps> = (props) => {
    return (
        <View style={ props.containerStyle }>
            <TouchableScale style={ styles.innerContainer } activeScale={ 0.97 } onPress={ props.onPress }>
                <Image style={ styles.image } source={ images.closeBlue } width={ 32 } height={ 32 } />
            </TouchableScale>
        </View>
    );
};

const styles = StyleSheet.create({
    innerContainer: {
        flexDirection: 'row',
    },
    image: {
        marginHorizontal: 8,
        marginBottom: 8,
    },
});
