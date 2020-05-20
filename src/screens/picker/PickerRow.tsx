import * as React from 'react';
import { PickerItem } from './PickerItem';
import { PDText } from '~/components/PDText';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';
import { StyleSheet } from 'react-native';

interface PickerRowProps {
    item: PickerItem;
    onSelect: (value: string) => void;
}

export const PickerRow: React.FunctionComponent<PickerRowProps> = (props: PickerRowProps) => {
    return (
        <TouchableScale
            style={ styles.container }
            onPress={ () => props.onSelect(props.item.value) }
            underlayColor={ 'transparent' }
            activeScale={ 0.99 }>

            <PDText style={ styles.poolNameText } >{ props.item.name }</PDText>
        </TouchableScale>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 24,
        marginHorizontal: 12,
        marginVertical: 6,
        backgroundColor: '#F5F5F5'
    },
    poolNameText: {
        color: 'black',
        fontSize: 22,
        marginVertical: 12,
        marginHorizontal: 24,
        fontWeight: '600'
    }
});
