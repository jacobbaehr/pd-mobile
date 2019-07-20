import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';

import { images } from 'assets/images';

interface CloseButtonProps {
    onPress: () => void;
}

export class CloseButton extends React.Component<CloseButtonProps, {}> {
    render() {
        return (
            <View style={styles.outerContainer}>
                <TouchableScale
                    style={styles.innerContainer}
                    underlayColor={'transparent'}
                    activeScale={0.97}
                    onPress={this.props.onPress}>
                    <Image
                        style={styles.image}
                        source={images.backTrans}
                        width={30}
                        height={30} />
                </TouchableScale>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        flexDirection: 'row'
    },
    innerContainer: {
        flexDirection: 'row'
    },
    image: {
        marginHorizontal: 8,
        marginBottom: 8
    }
});
