import * as React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { GradientButton } from '~/components/buttons/GradientButton';
import { PDText } from '~/components/PDText';

import { EditListHeader } from '../poolList/PoolDetailsHeader';
import { TextInputWithTitle } from '~/components/TextInputWithTitle';
import { ChoosyButton } from '~/components/buttons/ChoosyButton';
import { WaterTypeValue, getDisplayForWaterType } from '~/models/Pool/WaterType';
import { CycleButton } from '~/components/buttons/CycleButton';

interface PoolDetailProps {
    header: string;
    name: string;
    type: WaterTypeValue;
    volumeText: string;
    originalPoolName: string;
    updateVolume: (text: string) => void;
    updateName: (text: string) => void;
    pressedTypeButton: () => void;
    goBack(): void;
    rightButtonAction: (() => Promise<void>) | null;
    handleSavePoolPressed: () => void;
}

export const PoolDetails: React.FunctionComponent<PoolDetailProps> = (props) => {

    const { header, originalPoolName, goBack, rightButtonAction } = props;
    const waterTypeDisplay = getDisplayForWaterType(props.type);
    return (
        <SafeAreaView style={ styles.safeArea }>
            <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
                <View>
                    <EditListHeader
                        handleBackPress={ () => goBack() }
                        header={ header }
                        buttonText={ originalPoolName }
                        rightButtonAction={ rightButtonAction } />
                    <PDText style={ styles.sectionHeader }>Basic Information</PDText>

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
                        />
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
                    <View style={ styles.listContainer }>
                        <TextInputWithTitle
                            titleText='Volume'
                            subtitleText='(Gallons)'
                            onTextChanged={ (s) => props.updateVolume(s) }
                            titleTextStyles={ styles.poolNameLabel }
                            subtitleTextStyles={ styles.poolNameSubLabel }
                            inputStyles={ styles.textInput }
                            autoCapitalize='sentences'
                            autoCorrect={ false }
                            keyboardType='numeric'
                            value={ props.volumeText }
                        />
                        <CycleButton
                            title={ waterTypeDisplay || '' }
                            onPress={ props.pressedTypeButton }
                            styles={ styles.typeButton }
                            textStyles={ styles.typeButtonText }
                        />
                    </View>
                    <GradientButton
                        onPress={ () => props.handleSavePoolPressed() }
                        title={ 'Save' }
                        containerStyles={ styles.startServiceButton } />
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
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#ffffff',
    },
    listContainer: {
        marginTop: 10,
        marginHorizontal: 20
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
    sectionHeader: {
        marginTop: 20,
        marginHorizontal: 15,
        fontWeight: '700',
        fontSize: 28
    },
    startServiceButton: {
        height: 67,
        paddingHorizontal: 6
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
