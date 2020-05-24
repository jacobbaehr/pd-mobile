import * as React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { BoringButton } from '~/components/buttons/BoringButton';
import { PDText } from '~/components/PDText';

import { EditListHeader } from '../poolList/PoolDetailsHeader';
import { TextInputWithTitle, Focusable } from '~/components/TextInputWithTitle';
import { ChoosyButton } from '~/components/buttons/ChoosyButton';
import { WaterTypeValue, getDisplayForWaterType } from '~/models/Pool/WaterType';
import { CycleButton } from '~/components/buttons/CycleButton';
import { getDisplayForVolumeValue, VolumeUnits } from '~/models/Pool/VolumeUnits';

interface PoolDetailProps {
    name: string;
    type: WaterTypeValue;
    volumeUnits: VolumeUnits;
    volumeText: string;
    originalPoolName: string;
    updateVolume: (text: string) => void;
    updateName: (text: string) => void;
    pressedTypeButton: () => void;
    pressedUnitsButton: () => void;
    goBack(): void;
    rightButtonAction: (() => Promise<void>) | null;
    handleSavePoolPressed: () => void;
}

export const PoolDetails: React.FunctionComponent<PoolDetailProps> = (props) => {

    const { originalPoolName, goBack, rightButtonAction } = props;
    const waterTypeDisplay = getDisplayForWaterType(props.type);
    const volumeUnitsDisplay = getDisplayForVolumeValue(props.volumeUnits);

    const nameRef = React.useRef<Focusable>(null);
    const volumeRef = React.useRef<Focusable>(null);

    const onNameFieldSubmit = () => {
        volumeRef.current?.focus();
    }

    return (
        <SafeAreaView style={ styles.safeArea }>
            <EditListHeader
                handleBackPress={ () => goBack() }
                buttonText={ originalPoolName }
                rightButtonAction={ rightButtonAction } />
            <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" style={ styles.scrollView }>
                <View>
                    <View style={ styles.listContainer }>
                        <TextInputWithTitle
                            titleText='Name'
                            onTextChanged={ (s) => props.updateName(s) }
                            titleTextStyles={ styles.poolNameLabel }
                            inputStyles={ styles.textInput }
                            autoCapitalize='sentences'
                            autoCorrect={ false }
                            keyboardType='default'
                            value={ props.name }
                            autoFocus={ true }
                            ref={ nameRef }
                            onSubmitEditing={ onNameFieldSubmit }
                        />
                    </View>
                    <View style={ [styles.listContainer, styles.volumeContainer] }>
                        <TextInputWithTitle
                            titleText='Volume'
                            onTextChanged={ (s) => props.updateVolume(s) }
                            titleTextStyles={ styles.poolNameLabel }
                            subtitleTextStyles={ styles.poolNameSubLabel }
                            inputStyles={ styles.textInput }
                            autoCapitalize='sentences'
                            autoCorrect={ false }
                            keyboardType='numeric'
                            value={ props.volumeText }
                            containerStyles={ styles.volumeTextContainer }
                            ref={ volumeRef }
                        />
                        <View style={ styles.volumeUnitsButtonWrapper }>
                            <CycleButton
                                title={ volumeUnitsDisplay || '' }
                                onPress={ props.pressedUnitsButton }
                                styles={ styles.volumeUnitsButton }
                                textStyles={ styles.typeButtonText }
                            />
                        </View>
                    </View>
                    <View style={ [styles.listContainer, styles.typeContainer] }>
                        <PDText style={ styles.waterTypeLabel }>Water Type</PDText>
                        <ChoosyButton
                            title={ waterTypeDisplay || '' }
                            onPress={ props.pressedTypeButton }
                            styles={ styles.typeButton }
                            textStyles={ styles.typeButtonText }
                        />
                    </View>
                    <BoringButton
                        onPress={ () => props.handleSavePoolPressed() }
                        title={ 'Save' }
                        containerStyles={ styles.saveButton } />
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#ffffff',
        flex: 1
    },
    scrollView: {
        backgroundColor: '#F5F5F5'
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#ffffff',
    },
    listContainer: {
        marginTop: 10,
        marginHorizontal: 20,
        backgroundColor: 'white',
        paddingTop: 12,
        paddingHorizontal: 24,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#F0F0F0'
    },
    volumeContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    volumeTextContainer: {
        flex: 1
    },
    volumeUnitsButtonWrapper: {
        flex: 1
    },
    volumeUnitsButton: {
        alignSelf: 'flex-start',
        marginTop: 30,
        marginLeft: 15
    },
    poolNameLabel: {
        justifyContent: 'center',
        color: '#000000',
        fontWeight: '600',
        fontSize: 22
    },
    poolNameSubLabel: {
        justifyContent: 'center',
        color: '#1E6BFF',
        fontWeight: '600',
        fontSize: 22
    },
    waterTypeLabel: {
        justifyContent: 'center',
        color: '#000000',
        fontWeight: '600',
        fontSize: 22,
        // marginBottom: -20
    },
    textInput: {
        borderBottomWidth: 2,
        borderBottomColor: '#D0D0D0',
        color: '#1E6BFF',
        fontWeight: '500',
        fontSize: 22
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: '#005C9E',
        height: 45,
        margin: 15
    },
    saveButton: {
        marginTop: 25,
        paddingHorizontal: 6,
        backgroundColor: '#2c5fff',
        marginHorizontal: 15
    },
    typeContainer: {
        // borderBottomWidth: 2,
        // borderColor: '#4a4a4a4a',
        marginBottom: 12
    },
    typeButton: {
        alignSelf: 'flex-start',
        marginVertical: 10,
        marginLeft: 15
    },
    typeButtonText: {
        color: '#1E6BFF',
        fontSize: 22,
        fontWeight: '600'
    }
});
