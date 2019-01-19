import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { PDText } from '../../components/PDText';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';

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
        return (
            <View>
                {this.getButton()}
                <PDText style={styles.topText}>
                    Looks like you haven’t added any pools yet.
                </PDText>
                <PDText style={styles.bottomText}>
                    Tap the + icon above to get started.
                </PDText>
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
        height: 203,
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
        fontSize: 100
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
    }
});