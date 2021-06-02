import React from 'react';
import { StyleSheet } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { SVG } from '~/assets/images';
import { PDText } from '~/components/PDText';
import { PDSpacing, useTheme } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';
import { Haptic } from '~/services/HapticService';

interface ChipButtonProps {
    onPress: () => void;
}

export const ChipButton: React.FC<ChipButtonProps> = (props) => {
    const theme = useTheme();

    const handlePressed = () => {
        Haptic.medium();
        props.onPress();
    };

    const backgroundColor = theme.blurredBlue;
    const foregroundColor = theme.blue;

    return (
        <TouchableScale onPress={ handlePressed } activeScale={ 0.95 } style={ { marginRight: 'auto' } }>
            <PDView style={ [styles.container, { backgroundColor, borderColor: `${foregroundColor}33` }] }>
                <PDView style={ { marginHorizontal: 4 } }>
                    <SVG.IconPlay width={ 15 } height={ 15 } fill={ foregroundColor } />
                </PDView>
                    <PDText type="buttonSmall" color={ 'blue' } numberOfLines={ 2 }>
                        Enter Readings
                    </PDText>
            </PDView>
        </TouchableScale>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        padding: PDSpacing.xs,
        paddingRight: PDSpacing.sm,
        borderRadius: 48,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: PDSpacing.xs,
        marginRight: 'auto',
    },
});
