import * as React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { PDText } from '../../components/PDText';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';
import { images } from 'assets/images';

interface PoolListFooterProps {
    isEmpty: boolean,
    handlePress: () => void
}

export class PoolListFooter extends React.Component<PoolListFooterProps, {}> {

    handlePress = () => {
        this.props.handlePress();
    }

    getButton = () => {
        const buttonStyles = this.props.isEmpty
            ? [styles.button, styles.buttonEmpty]
            : [styles.button, styles.buttonNonEmpty];

        return (
        <TouchableScale
            style={buttonStyles} 
            underlayColor={'#DDD'}
            activeOpacity={0.6}
            activeScale={0.985}
            onPress={this.handlePress}>
                <PDText 
                    style={styles.plusText}>
                        +
                </PDText>
        </TouchableScale>);
    }

    render() {
        if (!this.props.isEmpty) { 
            return this.getButton();
        }
        const imageWidth = Dimensions.get('window').width;
        const imageHeight = imageWidth * 0.792;
        const imageStyles = this.props.isEmpty ? [styles.image] : [styles.image, styles.invisible];
        return (
            <View>
                {this.getButton()}
                <PDText style={styles.topText}>
                    Looks like you haven’t added any pools yet.
                </PDText>
                <PDText style={styles.bottomText}>
                    Tap the + icon above to get started.
                </PDText>
                <Image
                        style={imageStyles}
                        source={images.poolListEmpty}
                        width={imageWidth}
                        height={imageHeight} />
            </View>
        );
    }
}

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
        alignItems: 'center'
    },
    buttonEmpty: {
        marginTop: 0
    },
    buttonNonEmpty: {
        opacity: 0.25
    },
    plusText: {
        color: 'black',
        fontSize: 80
        // marginTop: -10
    },
    topText: {
        color: '#3A3A3A',
        fontSize: 22,
        fontWeight: '600',
        marginHorizontal: 20,
        textAlign: 'center',
        marginTop: 28
    },
    bottomText: {
        color: '#3A3A3A',
        fontSize: 22,
        fontWeight: '500',
        marginHorizontal: 20,
        textAlign: 'center',
        marginTop: 22
    },
    image: {
        opacity: 0.6
    },
    invisible: {
        opacity: 0
    }
});