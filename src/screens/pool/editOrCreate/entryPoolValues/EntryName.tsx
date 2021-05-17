import React, { useState } from 'react';
import { PDView } from '~/components/PDView';
import { InputAccessoryView, StyleSheet } from 'react-native';
import BorderInputWithLabel from '~/components/inputs/BorderInputWithLabel';
import { Button } from '~/components/buttons/Button';
import { useNavigation } from '@react-navigation/native';
import { PDStackNavigationProps } from '~/navigator/shared';
import { PDSpacing } from '~/components/PDTheme';
import { PlatformSpecific } from '~/components/PlatformSpecific';
import { useEntryPool } from '../hooks/useEntryPool';
import { useCallback } from 'react';

export const EntryName: React.FC = () => {
    // const dispatch = useThunkDispatch();
    const navigation = useNavigation<PDStackNavigationProps>();
    const { pool, setPool } = useEntryPool();
    const [name, setName] = useState(pool?.name ?? '');

    const keyboardAccessoryViewId = 'keyboardaccessoryidpooleditscreen1';


    const goBack = () => {
        navigation.goBack();
    };

    const handleOnPressSaveButton = () => {
        console.log('here');
        console.log(name);
        setPool({ name });
        goBack();
    };

    const textChanged =  useCallback(
        (newName: string) => {
            setName(newName);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [name],
    );

    const buttonDisabled = name === pool?.name;

    return (
        <PDView>
            <BorderInputWithLabel
                label="Name"
                placeholder="Aquaman's Pool"
                onChangeText={ textChanged }
                autoFocus
                inputAccessoryViewID={ keyboardAccessoryViewId }
                value={ name }
                returnKeyType="done"
                onSubmitEditing={ handleOnPressSaveButton }
                enablesReturnKeyAutomatically
            />
            <PlatformSpecific include={ ['ios'] }>
            <InputAccessoryView nativeID={ keyboardAccessoryViewId }>
                <PDView style={ styles.inputAccessoryView }>
                    <PDView
                        bgColor={ 'blue' }
                        opacity={ buttonDisabled ? 0 : 1 }
                        style={ styles.buttonContainer }>
                        <Button
                            textStyles={ styles.text }
                            textColor={ 'white' }
                            title="Save"
                            onPress={ handleOnPressSaveButton }
                            disabled={ buttonDisabled }
                            styles={ styles.saveButton }
                        />
                    </PDView>
                </PDView>
            </InputAccessoryView>
            </PlatformSpecific>
        </PDView>
    );
};

const styles = StyleSheet.create({
    inputAccessoryView: {
        width: '100%',
    },
    buttonContainer: {
        borderRadius: 27.5,
        justifyContent: 'center',
        alignSelf: 'center',
        opacity: 0.3,
        marginBottom: PDSpacing.lg,
    },
    saveButton: {
        borderRadius: 27.5,
        paddingHorizontal: 155,
        paddingVertical: PDSpacing.xs,
    },
    text: {
        fontWeight: '700',
        fontSize: 18,
        alignSelf: 'center',
    },
});
