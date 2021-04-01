import * as React from 'react';
import { PickerItem } from './PickerItem';
import { PDText } from '~/components/PDText';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Haptic } from '~/services/HapticService';

interface PickerRowProps {
    item: PickerItem;
    onSelect: (value: string) => void;
    isSelected: Boolean;
}

export const PickerRow: React.FunctionComponent<PickerRowProps> = (props: PickerRowProps) => {
    const containerStyles: ViewStyle[] = [styles.container];
    const textStyles: TextStyle[] = [styles.text];
    if (props.isSelected) {
        containerStyles.push(styles.activeContainer);
        textStyles.push(styles.activeText);
    }

    const handleSelection = () => {
        Haptic.selection();
        props.onSelect(props.item.value);
    };

    return (
        <TouchableScale style={ containerStyles } onPress={ handleSelection } activeScale={ 0.99 }>
            <PDText type="default" style={ textStyles }>
                {props.item.name}
            </PDText>
        </TouchableScale>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 24,
        marginHorizontal: 12,
        marginVertical: 6,
        backgroundColor: '#F5F5F5',
    },
    text: {
        color: 'black',
        fontSize: 22,
        marginVertical: 12,
        marginHorizontal: 24,
        fontWeight: '600',
    },
    activeContainer: {
        backgroundColor: '#2C5FFF',
    },
    activeText: {
        color: 'white',
    },
});
