import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { SVG } from '~/assets/images';
import { Button } from '~/components/buttons/Button';
import { ButtonWithChildren } from '~/components/buttons/ButtonWithChildren';
import { PDText } from '~/components/PDText';
import { PDSpacing } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';
import { Pool } from '~/models/Pool';
import { PDStackNavigationProps } from '~/navigator/shared';
import { useThunkDispatch, useTypedSelector } from '~/redux/AppState';
import { deletePool } from '~/redux/selectedPool/Actions';

interface DeletePoolModal {
    visible: boolean;
    toggleVisible: () => void

}


export const DeletePool: React.FC<DeletePoolModal> = (props ) => {
    const { visible, toggleVisible } = props;
    const selectedPool = useTypedSelector((state) => state.selectedPool) as Pool;
    const navigation = useNavigation<PDStackNavigationProps>();
    const dispatch = useThunkDispatch();

    if (!visible) {
        return null;

    }
    const onPressDelete = () => {
        toggleVisible();
        navigation.navigate('PoolList');

        dispatch(deletePool(selectedPool));
    };

    return (
        <PDView style={ styles.modalContainer }>
            <Modal isVisible={ visible }>
                <PDView style={ styles.modalContainer }>
                    <PDView style={ styles.modal }>
                        <PDText type="subHeading" color="black">
                            Deletion Warning
                        </PDText>
                        <PDView style={ styles.warning }>
                            <PDText type="bodyRegular" color="red" style={ styles.warningText }>
                                Continuing will permanently delete {selectedPool?.name}. This cannot be undone.
                            </PDText>
                        </PDView>
                        <ButtonWithChildren
                            // title="Delete PoolName's Pool"
                            onPress={ onPressDelete }>
                            <PDView style={ styles.deleteButton }>
                                <SVG.IconDelete width={ 16 } height={ 16 } fill="white" />
                                <PDText style={ styles.deleteButtonText }> Delete {selectedPool?.name}</PDText>
                            </PDView>
                        </ButtonWithChildren>
                        <Button
                            title="Cancel"
                            onPress={ toggleVisible }
                            styles={ styles.cancelButton }
                            textStyles={ styles.cancelButtonText }
                        />
                    </PDView>
                </PDView>
            </Modal>
        </PDView>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        // backgroundColor: 'black',
        // opacity: 0.7,
    },
    modal: {
        height: 296,
        width: 343,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        opacity: 1,
    },
    warning: {
        backgroundColor: '#FFF2F2',
        borderRadius: 8,
        height: 96,
        width: 295,
        marginTop: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    warningText: {
        opacity: 1,
        width: '80%',
        textAlign: 'center',
    },
    deleteButton: {
        width: 295,
        height: 40,
        backgroundColor: 'red',
        borderRadius: 27.5,
        marginVertical: PDSpacing.sm,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    deleteButtonText: {
        fontWeight: '700',
        fontSize: 18,
        color: 'white',
        alignSelf: 'center',
    },
    cancelButton: {
        width: 295,
        height: 40,
        backgroundColor: '#EDEDED',
        borderRadius: 27.5,
        justifyContent: 'center',
    },
    cancelButtonText: {
        fontWeight: '700',
        fontSize: 18,
        color: 'black',
        alignSelf: 'center',
    },
});
