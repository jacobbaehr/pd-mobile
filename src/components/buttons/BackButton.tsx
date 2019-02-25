import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';

import { images } from 'assets/images';
import { PDText } from 'components/PDText';

interface BackButtonProps {
    title: string;
    handleBackPressed: () => void;
    scale?: {scale:boolean, scaleLines:number};
}

export class BackButton extends React.Component<BackButtonProps, {}> {
    render() {
        return (
            <View style={styles.backButtonOuterContainer}>
                <TouchableScale
                    style={styles.backButtonInnerContainer}
                    underlayColor={'#F8F8F8'}
                    activeScale={0.97}
                    onPress={this.props.handleBackPressed}>
                    <Image
                        style={styles.backButtonImage}
                        source={images.back}
                        width={21}
                        height={21} />
                    <PDText style={styles.backButtonText} scale={this.props.scale}>
                        {this.props.title}
                    </PDText>

                </TouchableScale>
                <View style={styles.backButtonSpacer}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backButtonOuterContainer: {
        flexDirection: 'row',
        marginTop: 3
    },
    backButtonInnerContainer: {
        flexDirection: 'row'
    },
    backButtonImage: {
        marginTop: 8,
        marginRight: 10
    },
    backButtonText: {
        fontWeight: '700',
        fontSize: 28,
        color: 'black'
    },
    backButtonSpacer: {
        flex: 1
    }
});