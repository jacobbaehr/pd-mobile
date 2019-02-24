import * as React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';

import { PDText } from 'components/PDText';


interface ButtonProps {
    title: string;
    onPress: () => void;
    styles: any;
    disabled?: boolean;
}

export class GradientButton extends React.Component<ButtonProps, {}> {

    handleButtonPress = () => {
        this.props.onPress();
    }

    render() {
        const containerStyles = StyleSheet.flatten([styles.container, this.props.styles]);
        return (
            <TouchableScale
                style={containerStyles}
                onPress={this.handleButtonPress}
                disabled={this.props.disabled}
                activeScale={0.96}>
                <LinearGradient
                    colors={['#07A5FF', '#FF0073']}
                    start={{ x: -0.1, y: -0.1 }}
                    end={{ x: 1.15, y: 1.1 }}
                    style={styles.linearGradient}>
                    <PDText style={styles.text}>
                        {this.props.title}
                    </PDText>
                </LinearGradient>
            </TouchableScale>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 9.5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 1
    },
    text: {
        flex: 1,
        color: 'white',
        textAlign: 'center',
        fontSize: 24,
        lineHeight: 55,
        fontWeight: '700'
    },
    linearGradient: {
        flex: 1,
        borderRadius: 9.5,
        marginVertical: 8
    }
});
