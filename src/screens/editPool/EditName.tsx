import React, { useState } from 'react';
import { PDView } from '~/components/PDView';
import { InputAccessoryView, StyleSheet } from 'react-native';
import BorderInputWithLabel from '~/components/inputs/BorderInputWithLabel';
import { Button } from '~/components/buttons/Button';
import { useNavigation } from '@react-navigation/native';
import { PDStackNavigationProps } from '~/navigator/shared';
import { useThunkDispatch, useTypedSelector } from '~/redux/AppState';
import { updatePool } from '~/redux/selectedPool/Actions';
import { Pool } from '~/models/Pool';

export const EditName = () => {
    const dispatch = useThunkDispatch();
    const navigation = useNavigation<PDStackNavigationProps>();
    const keyboardAccessoryViewId = 'keyboardaccessoryidpooleditscreen1';
    const selectedPool = useTypedSelector((state) => state.selectedPool) as Pool;
    const [name, setName] = useState(selectedPool?.name ?? '');
    const goBack = () => {
        navigation.goBack();
    };

    const handleOnPressSaveButton = () => {
        const rawPool: Pool = { ...selectedPool, name };

        const existingPool = Pool.make(rawPool);
        dispatch(updatePool(existingPool));

        goBack();
    };

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const textChanged = (text: string) => {
        setName(text);
        if (text === '') {
            setButtonDisabled(true);
        } else {
            setButtonDisabled(false);
        }
    };

    return (
        <PDView>
            <BorderInputWithLabel
                label="Name"
                placeholder="Aquaman's Pool"
                onChangeText={ textChanged }
                autoFocus
                inputAccessoryViewID={ keyboardAccessoryViewId }
                value={ name }
            />
            <InputAccessoryView nativeID={ keyboardAccessoryViewId }>
                <PDView style={ styles.inputAccessoryView }>
                    <PDView
                        bgColor={ buttonDisabled ? 'greyLight' : 'blue' }
                        opacity={ buttonDisabled ? 0.3 : 1 }
                        style={ styles.buttonContainer }>
                        <Button
                            textStyles={ styles.text }
                            textColor={ buttonDisabled ? 'black' : 'white' }
                            title="Save"
                            onPress={ handleOnPressSaveButton }
                            disabled={ buttonDisabled }
                        />
                    </PDView>
                </PDView>
            </InputAccessoryView>
        </PDView>
    );
};

const styles = StyleSheet.create({
    inputAccessoryView: {
        width: '100%',
    },
    buttonContainer: {
        borderRadius: 27.5,
        height: 40,
        justifyContent: 'center',
        opacity: 0.3,
        width: '90%',
        alignSelf: 'center',
        marginBottom: 24,
    },
    text: {
        fontWeight: '700',
        fontSize: 18,

        alignSelf: 'center',
    },
});
