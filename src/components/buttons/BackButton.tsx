import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';

import { images } from 'assets/images';
import { PDText } from 'components/PDText';

interface BackButtonProps {
    title: string;
    handleBackPressed: () => void;
    imageSource?: string;
    scale?: {scale:boolean, scaleLines:number};
}

export class BackButton extends React.Component<BackButtonProps, {}> {
    private getText = () => {
        return this.props.title ? (
            <PDText style={styles.backButtonText} scale={this.props.scale}>
                {this.props.title}
            </PDText>
        ) : null;
    }
    render() {
        const imageSource = this.props.imageSource ? this.props.imageSource : images.back;
        return (
            <View style={styles.backButtonOuterContainer}>
                <TouchableScale
                    style={styles.backButtonInnerContainer}
                    underlayColor={'#F8F8F8'}
                    activeScale={0.97}
                    onPress={this.props.handleBackPressed}>
                    <Image
                        style={styles.backButtonImage}
                        source={imageSource}
                        width={21}
                        height={21} />
                    { this.getText() }
                </TouchableScale>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backButtonOuterContainer: {
        flexDirection: 'row'
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
    }
});