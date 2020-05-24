import * as React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';

import { PDText } from '~/components/PDText';
import { Haptic } from '~/services/HapticService';

interface ChoosyButtonProps {
    title: string;
    onPress: () => void;
    styles?: any;
    textStyles?: any;
    disabled?: boolean;
}

export const CycleButton: React.FunctionComponent<ChoosyButtonProps> = (props: ChoosyButtonProps) => {

    const handleButtonPress = () => {
        Haptic.selection();
        props.onPress();
    };

    return (
        <TouchableScale
            style={ [styles.container, props.styles] }
            activeScale={ 0.96 }
            onPress={ handleButtonPress }
            disabled={ props.disabled } >
            <PDText style={ props.textStyles || styles.text }>
                { props.title }
            </PDText>
        </TouchableScale>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 17,
        borderWidth: 2,
        borderColor: '#F0F0F0',
        paddingTop: 4,
        paddingHorizontal: 7
    },
    text: {
        color: '#1E6BFF',
        textAlign: 'center',
        margin: '.5%',
        fontSize: 18,
        fontWeight: '600'
    }
});