import * as React from 'react';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';
import { StyleSheet, View } from 'react-native';
import { PDText } from '~/components/PDText';
import { Scoop } from '~/models/Scoop';
import { Haptic } from '~/services/HapticService';
import pluralize from 'pluralize';


interface ScoopListItemProps {
    scoop: Scoop;
    handlePressedScoop: (scoop: Scoop) => void;
}

export const ScoopListItem: React.FunctionComponent<ScoopListItemProps> = (props) => {

    const handlePressed = () => {
        Haptic.light();
        props.handlePressedScoop(props.scoop);
    }

    const unitsText = `${props.scoop.displayValue} ${pluralize(props.scoop.displayUnits, parseFloat(props.scoop.displayValue))}`;

    return (
        <TouchableScale
            onPress={ handlePressed }
            activeScale={ 0.96 }>
            <View style={ styles.listItemContainer }>
                <PDText style={ styles.chemNameText }>{ props.scoop.chemName }</PDText>
                <PDText style={ styles.unitsText }>{ unitsText }</PDText>
            </View>
        </TouchableScale>
    );
}

const styles = StyleSheet.create({
    listItemContainer: {
        flexDirection: 'row',
        marginTop: 6,
        marginHorizontal: 20,
        marginBottom: 6,
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#F0F0F0'
    },
    chemNameText: {
        fontWeight: '600',
        fontSize: 18,
        color: 'black',
        alignSelf: 'center'
    },
    unitsText: {
        fontWeight: '600',
        fontSize: 18,
        color: '#1E6BFF',
        alignSelf: 'center',
        marginLeft: 'auto'
    },
});