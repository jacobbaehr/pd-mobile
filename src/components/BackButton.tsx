import * as React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { PDText } from './PDText';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';


interface BackButtonProps {
    title: string
    handleBackPressed: () => void
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
                                source={require('../assets/back.png')}
                                width={21}
                                height={21}/>
                            <PDText style={styles.backButtonText}>
                                {this.props.title}
                            </PDText>
                        
                </TouchableScale>
                <View style={styles.backButtonSpacer}></View>
            </View>);
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