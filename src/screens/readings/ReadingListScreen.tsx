import * as React from 'react';
import {
    InputAccessoryView, Keyboard, LayoutAnimation, SectionListData, StyleSheet,
} from 'react-native';
import { KeyboardAwareSectionList } from 'react-native-keyboard-aware-scroll-view';
import { BoringButton } from '~/components/buttons/BoringButton';
import { ScreenHeader } from '~/components/headers/ScreenHeader';
import { PDSafeAreaView } from '~/components/PDSafeAreaView';
import { useTheme } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';
import { PlatformSpecific } from '~/components/PlatformSpecific';
import { ServiceNonStickyHeader } from '~/components/services/ServiceNonStickyHeader';
import { ServiceStickyHeaderList } from '~/components/services/ServiceStickyHeaderList';
import { useLoadRecipeHook } from '~/hooks/RealmPoolHook';
import { Pool } from '~/models/Pool';
import { PDStackNavigationProps } from '~/navigator/shared';
import { dispatch, useTypedSelector } from '~/redux/AppState';
import { clearReadings, recordInput } from '~/redux/readingEntries/Actions';
import { Config } from '~/services/Config';
import { Haptic } from '~/services/HapticService';
import { RecipeService } from '~/services/RecipeService';
import { Util } from '~/services/Util';

import { useNavigation } from '@react-navigation/native';

import { ReadingListFooter } from './ReadingListFooter';
import { ReadingListItem, ReadingState } from './ReadingListItem';

export const ReadingListScreen: React.FC = () => {
    const [isSliding, setIsSliding] = React.useState(false);
    const [readingStates, setReadingStates] = React.useState<ReadingState[]>([]);
    const pool = useTypedSelector((state) => state.selectedPool) as Pool;
    const recipe = useLoadRecipeHook(pool.recipeKey || RecipeService.defaultFormulaKey);
    const { setOptions, navigate } = useNavigation<PDStackNavigationProps>();
    const theme = useTheme();

    const keyboardAccessoryViewId = 'wowThisIsSomeReallyUniqueTextReadingListKeyboard';

    React.useEffect(() => {
        setOptions({ gestureResponseDistance: { horizontal: 5 } });
        if (recipe) {
            const initialReadingStates = recipe.readings.map((r) => ({
                reading: r,
                value: r.defaultValue.toFixed(r.decimalPlaces),
                isOn: false,
            }));

            // Just incase we had some old reading entries laying around:
            readingStates.forEach((rs) => {
                initialReadingStates.forEach((is) => {
                    if (is.reading.var === rs.reading.var) {
                        is.value = rs.value || is.reading.defaultValue.toFixed(is.reading.decimalPlaces);
                        is.isOn = rs.isOn;
                    }
                });
            });

            setReadingStates(initialReadingStates);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipe?.id, recipe?.ts, pool]);

    const handleCalculatePressed = (): void => {
        dispatch(clearReadings());
        readingStates.forEach((rs) => {
            if (rs.isOn && rs.value !== undefined) {
                dispatch(recordInput(rs.reading, parseFloat(rs.value)));
            }
        });
        navigate('TreatmentList');
    };

    const handleSlidingStopped = (varName: string) => {
        setIsSliding(false);
        let isChanged = false;
        const rs = Util.deepCopy(readingStates);
        rs.forEach((r) => {
            if (r.reading.var === varName && !r.isOn) {
                isChanged = true;
                r.isOn = true;
            }
        });
        if (isChanged) {
            // Animate the progress bar change here:
            const springAnimationProperties = {
                type: Config.isIos ? LayoutAnimation.Types.keyboard : LayoutAnimation.Types.easeOut,
                property: LayoutAnimation.Properties.scaleXY,
            };
            const animationConfig = {
                duration: 250, // how long the animation will take
                create: undefined,
                update: springAnimationProperties,
                delete: undefined,
            };
            LayoutAnimation.configureNext(animationConfig);
            setReadingStates(rs);
        }
    };

    const handleSlidingStarted = () => {
        setIsSliding(true);
    };

    const handleSliderUpdatedValue = (varName: string, value: number) => {
        const rs = Util.deepCopy(readingStates);
        let isChanged = false;
        rs.forEach((r) => {
            if (r.reading.var === varName) {
                const newValue = value.toFixed(r.reading.decimalPlaces);
                if (newValue !== r.value) {
                    isChanged = true;
                    r.value = newValue;
                }
            }
        });
        if (isChanged) {
            setReadingStates(rs);
            Haptic.bumpyGlide();
        }
    };

    const handleTextboxUpdated = (varName: string, text: string) => {
        const rs = Util.deepCopy(readingStates);
        rs.forEach((r) => {
            if (r.reading.var === varName) {
                r.value = text;
            }
        });
        setReadingStates(rs);
    };

    const handleTextboxDismissed = (varName: string, text: string) => {
        const rs = Util.deepCopy(readingStates);
        rs.forEach((r) => {
            if (r.reading.var === varName) {
                r.value = text;
                r.isOn = text.length > 0;
            }
        });
        setReadingStates(rs);
    };

    const handleIconPressed = (varName: string) => {
        Haptic.light();
        const rs = Util.deepCopy(readingStates);
        rs.forEach((r) => {
            if (r.reading.var === varName) {
                r.isOn = !r.isOn;
                if (r.isOn && !r.value) {
                    r.value = r.reading.defaultValue.toFixed(r.reading.decimalPlaces);
                }
            }
        });
        // Animate the progress bar change here:
        const springAnimationProperties = {
            type: Config.isIos ? LayoutAnimation.Types.keyboard : LayoutAnimation.Types.easeOut,
            property: LayoutAnimation.Properties.scaleXY,
        };
        const animationConfig = {
            duration: 250, // how long the animation will take
            create: undefined,
            update: springAnimationProperties,
            delete: undefined,
        };
        LayoutAnimation.configureNext(animationConfig);
        setReadingStates(rs);
    };

    const handleChangeRecipePressed = () => {
        navigate('RecipeList', { prevScreen: 'ReadingList' });
    };
    const handleDismissedKeyboard = () => {
        Keyboard.dismiss();
        Haptic.light();
    };

    // The first section is just a dummy header thing to enable some fancy scrolling behavior
    let sections: SectionListData<ReadingState>[] = [
        // dummy header
        { data: [], isHeader: true },
        // actual readings
        { data: readingStates, isHeader: false },
    ];

    let completed: ReadingState[] = [];
    if (recipe) {
        completed = readingStates.filter((r) => r.isOn);
    }
    return (
        <PDSafeAreaView style={ { flex: 1 } } bgColor="white">
            <ScreenHeader textType="heading" color="blue">Readings</ScreenHeader>
            <PDView style={ styles.container } bgColor="white">
                <KeyboardAwareSectionList
                    style={ StyleSheet.flatten([styles.sectionList, { backgroundColor: theme.colors.blurredBlue }]) }
                    scrollEnabled={ !isSliding }
                    keyboardDismissMode={ 'interactive' }
                    keyboardShouldPersistTaps={ 'handled' }
                    renderItem={ ({ item }) => (
                        <ReadingListItem
                            readingState={ item }
                            onTextboxUpdated={ handleTextboxUpdated }
                            onTextboxFinished={ handleTextboxDismissed }
                            onSlidingStart={ handleSlidingStarted }
                            onSlidingComplete={ handleSlidingStopped }
                            onSliderUpdatedValue={ handleSliderUpdatedValue }
                            handleIconPressed={ handleIconPressed }
                            inputAccessoryId={ keyboardAccessoryViewId }
                        />
                    ) }
                    sections={ sections }
                    keyExtractor={ (item) => item.reading.var }
                    contentInsetAdjustmentBehavior="always"
                    stickySectionHeadersEnabled={ true }
                    canCancelContentTouches={ true }
                    renderSectionFooter={ ({ section }) => {
                        if (section.isHeader) {
                            return <></>;
                        } else {
                            return (
                                <ReadingListFooter
                                    recipe={ recipe || null }
                                    pressedChangeRecipe={ handleChangeRecipePressed }
                                />
                            );
                        }
                    } }
                    renderSectionHeader={ ({ section }) => {
                        if (section.isHeader) {
                            return <ServiceNonStickyHeader />;
                        } else {
                            return (
                                <ServiceStickyHeaderList
                                    completedLength={ completed.length }
                                    missingLength={ readingStates.length }
                                    color="blue"
                                />
                            );
                        }
                    } }
                />
                <PDView style={ styles.bottomButtonContainer } bgColor="white">
                    <BoringButton
                        containerStyles={ StyleSheet.flatten([styles.button, { backgroundColor: theme.colors.blue }]) }
                        onPress={ handleCalculatePressed }
                        title="Calculate"
                    />
                </PDView>
            </PDView>
            <PlatformSpecific include={ ['ios'] }>
                <InputAccessoryView nativeID={ keyboardAccessoryViewId }>
                    <PDView style={ styles.keyboardAccessoryContainer }>
                        <BoringButton
                            containerStyles={ StyleSheet.flatten([
                                styles.keyboardAccessoryButton,
                                { backgroundColor: theme.colors.blue },
                            ]) }
                            textStyles={ styles.keyboardAccessoryButtonText }
                            onPress={ handleDismissedKeyboard }
                            title="Done Typing"
                        />
                    </PDView>
                </InputAccessoryView>
            </PlatformSpecific>
        </PDSafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sectionList: {
        flex: 1,
    },
    bottomButtonContainer: {
        borderTopColor: '#F0F0F0',
        borderTopWidth: 2,
    },
    button: {
        alignSelf: 'stretch',
        margin: 12,
        marginBottom: 24,
    },
    keyboardAccessoryContainer: {
        backgroundColor: '#F8F8F8',
        padding: 12,
    },
    keyboardAccessoryButton: {
        marginHorizontal: 24,
    },
    keyboardAccessoryButtonText: {
        color: 'white',
        fontSize: 18,
    },
});
