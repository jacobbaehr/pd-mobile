import * as React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';
import { PDText } from '~/components/PDText';
import { Haptic } from '~/services/HapticService';

interface CycleButtonProps {
    title: string;
    onPress: () => void;
    styles?: ViewStyle | ViewStyle[];
    textStyles?: any;
    disabled?: boolean;
}

export const CycleButton: React.FunctionComponent<CycleButtonProps> = (props: CycleButtonProps) => {
    const handleButtonPress = () => {
        Haptic.selection();
        props.onPress();
    };

    return (
        <TouchableScale
            style={ [styles.container, props.styles] }
            activeScale={ 1.05 }
            onPress={ handleButtonPress }
            disabled={ props.disabled }>
            <PDText type="default" style={ [styles.text, props.textStyles] }>
                {props.title}
            </PDText>
        </TouchableScale>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 17,
        borderWidth: 2,
        borderColor: '#F0F0F0',
        paddingHorizontal: 7,
        paddingVertical: 3,
    },
    text: {
        color: '#1E6BFF',
        textAlign: 'center',
        textAlignVertical: 'center',
        // TODO: use theme spacing & fonts
        margin: '.5%',
        fontSize: 18,
        fontWeight: '600',
    },
});
