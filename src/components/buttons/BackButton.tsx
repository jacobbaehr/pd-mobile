import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';

import { images } from '~/assets/images';
import { PDText } from '~/components/PDText';

type BackButtonColor = 'blue' | 'readingsBlue' | 'treatmentsPurple' | 'recipesGreen';

interface BackButtonProps {
    title?: string;
    onPress: () => void;
    scale?: { scale: boolean, scaleLines: number };
    color?: BackButtonColor;
}

export class BackButton extends React.Component<BackButtonProps, {}> {
    private getText = () => {
        return this.props.title ? (
            <PDText style={ styles.backButtonText } scale={ this.props.scale }>
                { this.props.title }
            </PDText>
        ) : null;
    }
    render() {
        let imageSource = images.backBlue;
        if (this.props.color === 'blue') {
            imageSource = images.backBlue;
        } else if (this.props.color === 'readingsBlue') {
            imageSource = images.backReadingsBlue;
        } else if (this.props.color === 'treatmentsPurple') {
            imageSource = images.backTreatmentsPurple;
        } else if (this.props.color === 'recipesGreen') {
            imageSource = images.backRecipesGreen;
        }
        return (
            <View style={ styles.backButtonOuterContainer }>
                <TouchableScale
                    style={ styles.backButtonInnerContainer }
                    underlayColor={ '#F8F8F8' }
                    activeScale={ 0.97 }
                    onPress={ this.props.onPress }>
                    <Image
                        style={ styles.backButtonImage }
                        source={ imageSource }
                        width={ 32 }
                        height={ 32 } />
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
        paddingTop: 5,
        fontWeight: '700',
        fontSize: 28,
        color: 'black'
    }
});