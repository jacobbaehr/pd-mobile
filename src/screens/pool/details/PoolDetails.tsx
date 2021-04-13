import * as React from 'react';
import { InputAccessoryView, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SafeAreaView from 'react-native-safe-area-view';
import { BoringButton } from '~/components/buttons/BoringButton';
import { ChoosyButton } from '~/components/buttons/ChoosyButton';
import { CycleButton } from '~/components/buttons/CycleButton';
import { PDText } from '~/components/PDText';
import { PlatformSpecific } from '~/components/PlatformSpecific';
import { Focusable, TextInputWithTitle } from '~/components/TextInputWithTitle';
import { getDisplayForPoolValue, PoolUnit } from '~/models/Pool/PoolUnit';
import { getDisplayForWallType, WallTypeValue } from '~/models/Pool/WallType';
import { getDisplayForWaterType, WaterTypeValue } from '~/models/Pool/WaterType';

import { EditListHeader } from './PoolDetailsHeader';

interface PoolDetailProps {
    name: string;
    waterType: WaterTypeValue;
    wallType: WallTypeValue;
    poolUnit: PoolUnit;
    volumeText: string;
    originalPoolName: string;
    updateVolume: (text: string) => void;
    updateName: (text: string) => void;
    pressedWaterTypeButton: () => void;
    pressedWallTypeButton: () => void;
    pressedUnitsButton: () => void;
    goBack(): void;
    rightButtonAction: (() => Promise<void>) | null;
    handleSavePoolPressed: () => void;
}

export const PoolDetails: React.FunctionComponent<PoolDetailProps> = (props) => {
    const { originalPoolName, goBack, rightButtonAction } = props;
    const waterTypeDisplay = getDisplayForWaterType(props.waterType);
    const wallTypeDisplay = getDisplayForWallType(props.wallType);
    let poolUnitDisplay = getDisplayForPoolValue(props.poolUnit);
    const nameRef = React.useRef<Focusable>(null);
    const volumeRef = React.useRef<Focusable>(null);

    const keyboardAccessoryViewId = 'keyboardaccessoryidpooleditscreen';

    const onNameFieldSubmit = () => {
        volumeRef.current?.focus();
    };

    return (
        <SafeAreaView style={ styles.safeArea }>
            <EditListHeader
                handleBackPress={ () => goBack() }
                buttonText={ originalPoolName }
                rightButtonAction={ rightButtonAction }
            />
            <KeyboardAwareScrollView
                style={ styles.scrollView }
                keyboardShouldPersistTaps="handled"
                // The bottom-view here is about the size of a tab-bar, so this is close to reality:
                viewIsInsideTabBar={ true }>
                <View>
                    <View style={ styles.listContainer }>
                        <TextInputWithTitle
                            titleText="Name"
                            onTextChanged={ props.updateName }
                            titleTextStyles={ styles.poolNameLabel }
                            inputStyles={ styles.textInput }
                            autoCapitalize="words"
                            autoCorrect={ false }
                            keyboardType="default"
                            value={ props.name }
                            autoFocus={ false }
                            ref={ nameRef }
                            onSubmitEditing={ onNameFieldSubmit }
                            accessoryViewId={ keyboardAccessoryViewId }
                            hitSlop={ 30 }
                        />
                    </View>
                    <View style={ [styles.listContainer, styles.volumeContainer] }>
                        <TextInputWithTitle
                            titleText="Volume"
                            onTextChanged={ props.updateVolume }
                            titleTextStyles={ styles.poolNameLabel }
                            subtitleTextStyles={ styles.poolNameSubLabel }
                            inputStyles={ styles.textInput }
                            autoCapitalize="sentences"
                            autoCorrect={ false }
                            keyboardType="number-pad"
                            value={ props.volumeText }
                            containerStyles={ styles.volumeTextContainer }
                            ref={ volumeRef }
                            accessoryViewId={ keyboardAccessoryViewId }
                            hitSlop={ 30 }
                        />
                        <View style={ styles.volumeUnitsButtonWrapper }>
                            <CycleButton
                                title={ poolUnitDisplay || '' }
                                onPress={ props.pressedUnitsButton }
                                styles={ styles.volumeUnitsButton }
                                textStyles={ styles.typeButtonText }
                            />
                        </View>
                    </View>
                    <View style={ styles.listContainer }>
                        <PDText type="default" style={ styles.waterTypeLabel }>
                            Water Type
                        </PDText>
                        <ChoosyButton
                            title={ waterTypeDisplay || '' }
                            onPress={ props.pressedWaterTypeButton }
                            styles={ styles.typeButton }
                            textStyles={ styles.typeButtonText }
                        />
                    </View>
                    <View style={ styles.listContainer }>
                        <PDText type="default" style={ styles.waterTypeLabel }>
                            Wall Type
                        </PDText>
                        <ChoosyButton
                            title={ wallTypeDisplay || '' }
                            onPress={ props.pressedWallTypeButton }
                            styles={ styles.typeButton }
                            textStyles={ styles.typeButtonText }
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
            <View style={ styles.bottomButtonContainer }>
                <BoringButton containerStyles={ styles.saveButton } onPress={ props.handleSavePoolPressed } title="Save" />
            </View>
            <PlatformSpecific include={ ['ios'] }>
                <InputAccessoryView nativeID={ keyboardAccessoryViewId }>
                    <View style={ styles.keyboardAccessoryContainer }>
                        <BoringButton
                            containerStyles={ styles.keyboardAccessoryButton }
                            textStyles={ styles.keyboardAccessoryButtonText }
                            onPress={ props.handleSavePoolPressed }
                            title="Save"
                        />
                    </View>
                </InputAccessoryView>
            </PlatformSpecific>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#ffffff',
        flex: 1,
    },
    scrollView: {
        backgroundColor: '#F5F5F5',
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
        borderColor: '#F0F0F0',
    },
    volumeContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    volumeTextContainer: {
        flex: 1,
    },
    volumeUnitsButtonWrapper: {
        flex: 1,
    },
    volumeUnitsButton: {
        alignSelf: 'flex-start',
        marginTop: 30,
        marginLeft: 15,
    },
    poolNameLabel: {
        justifyContent: 'center',
        color: '#000000',
        fontWeight: '600',
        fontSize: 22,
    },
    poolNameSubLabel: {
        justifyContent: 'center',
        color: '#1E6BFF',
        fontWeight: '600',
        fontSize: 22,
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
        fontSize: 22,
    },
    saveButton: {
        backgroundColor: '#2c5fff',
        margin: 12,
        marginBottom: 24,
    },
    typeButton: {
        alignSelf: 'flex-start',
        marginVertical: 10,
        marginLeft: 15,
    },
    typeButtonText: {
        color: '#1E6BFF',
        fontSize: 22,
        fontWeight: '600',
    },
    keyboardAccessoryContainer: {
        backgroundColor: 'white',
        borderTopColor: '#F0F0F0',
        borderTopWidth: 2,
        padding: 12,
    },
    keyboardAccessoryButton: {
        backgroundColor: '#2c5fff',
    },
    keyboardAccessoryButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '700',
    },
    bottomButtonContainer: {
        backgroundColor: 'white',
        borderTopColor: '#F0F0F0',
        borderTopWidth: 2,
    },
});
