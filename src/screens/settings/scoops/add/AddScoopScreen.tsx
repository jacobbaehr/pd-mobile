import React from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import { KeyboardButton } from '~/components/buttons/KeyboardButton';
import { PDButton } from '~/components/buttons/PDButton';
import ModalHeader from '~/components/headers/ModalHeader';
import BorderInputWithLabel from '~/components/inputs/BorderInputWithLabel';
import { PDSafeAreaView } from '~/components/PDSafeAreaView';
import { PDText } from '~/components/PDText';
import { PDSpacing, useTheme } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';
import { useStandardStatusBar } from '~/hooks/useStatusBar';
import { PDStackNavigationProps } from '~/navigator/shared';
import { Util } from '~/services/Util';

import { useNavigation } from '@react-navigation/native';

import { useFetchAllTreatments } from '../useScoops';

export const AddScoopScreen = () => {
    useStandardStatusBar();
    const theme = useTheme();
    // const [amount, setAmount] = useState<string>('');
    const { navigate } = useNavigation<PDStackNavigationProps>();
    const treatments = useFetchAllTreatments();

    const handleChemicalPressed = () => {
        navigate('PopoverScreen', {
            title: 'Select Chemical',
            color: 'pink',
            items: treatments.map((t) => ({
                name: Util.getDisplayNameForTreatment(t),
                value: t.var,
            })),
            popoverKey: 'scoop',
        });
    };

    const handleUnitPressed = () => {
        navigate('PopoverScreen', {
            title: 'Change Unit',
            color: 'orange',
            items:[],
        });
    };


    const handleSavePressed = () => {
        Keyboard.dismiss();



    };

    const keyboardId = 'thisistheuniquekeyboardidforscoops';

    return (
        <PDSafeAreaView bgColor="white">
            <ModalHeader>Add Scoop</ModalHeader>
            <PDView style={ styles.content }>
                <PDView style={ styles.containerDescription }>
                    <PDText type="bodyRegular" color="grey" numberOfLines={ 2 } textAlign="center">
                        this is an optional description that talks about this field.
                    </PDText>
                </PDView>
                <PDView>
                    <PDText type="bodyGreyBold" color="grey">
                        chemical
                    </PDText>
                    <PDButton bgColor="white" textColor="pink" style={ styles.button }  onPress={ handleChemicalPressed }>
                        sodium carbonate
                    </PDButton>
                </PDView>
                <PDView style={ styles.row }>
                    <BorderInputWithLabel
                        label="Amount"
                        textInputStyleProps={ { minWidth: 200 , color: theme.colors.pink } }
                        containerStyles={ { marginRight: 'auto' } }
                        inputAccessoryViewID={ keyboardId }
                        keyboardType="numeric"
                        maxLength={ 5 }
                        placeholder="Amount"
                        returnKeyLabel="Done"
                        returnKeyType="done"
                    />
                    <PDView>
                        <PDText type="bodyGreyBold" color="grey">
                            unit
                        </PDText>
                        <PDButton  bgColor="white" textColor="pink" style={ styles.button } onPress={ handleUnitPressed } >
                            Gallons
                        </PDButton>
                    </PDView>
                </PDView>
                <KeyboardButton
                    nativeID={ keyboardId }
                    bgColor={ true ? 'pink' : 'greyLighter' }
                    hitSlop={ { top: 5, left: 5, bottom: 5, right: 5 } }
                    disabled={ false }
                    onPress={ handleSavePressed }>
                    Save
                </KeyboardButton>
            </PDView>
        </PDSafeAreaView>
    );
};

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: PDSpacing.lg,
    },
    containerDescription: {
        paddingVertical: PDSpacing.lg,
    },
    row: {
        paddingTop: PDSpacing.sm,
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        borderWidth: 2,
        borderColor: '#F0F0F0',
        paddingVertical: PDSpacing.xs,
        minWidth: 150,
    },
});
