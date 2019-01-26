import * as React from 'react';
import { Color } from 'csstype';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface PDProgressBarProps {
    /// From 0 to 1
    progress: number;
    foregroundColors: Color[];
    style: StyleProp<ViewStyle>;
}

export class PDProgressBar extends React.Component<PDProgressBarProps, {}> {
    render() {
        const foregroundFlex = this.props.progress;
        const backgroundFlex = 1 - foregroundFlex;

        const containerStyle = StyleSheet.flatten([
            styles.container,
            this.props.style
        ]);

        const backgroundStyle = {
            backgroundColor: 'transparent',
            flex: backgroundFlex
        };  
        return (
            <View style={containerStyle}>
                <LinearGradient
                        colors={this.props.foregroundColors}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 1}}
                        style={{ flex: foregroundFlex }}>
                </LinearGradient>
                <View style={backgroundStyle} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
});