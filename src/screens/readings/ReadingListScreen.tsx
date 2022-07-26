import * as React from 'react';
import { Keyboard, LayoutAnimation, SectionListData, StyleSheet } from 'react-native';
import { KeyboardAwareSectionList } from 'react-native-keyboard-aware-scroll-view';
import { KeyboardButton } from '~/components/buttons/KeyboardButton';
import { ScreenHeader } from '~/components/headers/ScreenHeader';
import { PDSafeAreaView } from '~/components/PDSafeAreaView';
import { PDSpacing } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';
import { dispatch } from '~/redux/AppState';
import { clearReadings, recordInput } from '~/redux/readingEntries/Actions';
import { Config } from '~/services/Config/AppConfig';
import { Haptic } from '~/services/HapticService';
import { Util } from '~/services/Util';

import { ReadingListItem, ReadingState } from './ReadingListItem';
import { ReadingListHeader } from './ReadingListHeader';
import { PlayButton } from '~/components/buttons/PlayButton';
import { useReadingListState } from './UseReadingListState';

export const ReadingListScreen: React.FC = () => {
    const state = useReadingListState();

    const keyboardAccessoryViewId = 'wowThisIsSomeReallyUniqueTextReadingListKeyboard';

    React.useEffect(() => {
        state.setOptions({ gestureResponseDistance: 5 });
        if (state.formula) {
            const readingsOnByDefault = new Set<string>();
            if (state.lastLogEntry) {
                state.lastLogEntry.readingEntries
                    .forEach(r => readingsOnByDefault.add(r.id));
            } else {
                state.formula.readings
                    .filter(r => r.isDefaultOn)
                    .forEach(r => readingsOnByDefault.add(r.id));
            }
            const initialReadingStates = state.formula.readings.map((r) => ({
                reading: r,
                value: r.defaultValue.toFixed(r.decimalPlaces),
                isOn: readingsOnByDefault.has(r.id),
            }));

            // Just incase we had some old reading entries laying around:
            state.readingStates.forEach((rs) => {
                initialReadingStates.forEach((is) => {
                    if (is.reading.id === rs.reading.id) {
                        is.value = rs.value || is.reading.defaultValue.toFixed(is.reading.decimalPlaces);
                        is.isOn = rs.isOn;
                    }
                });
            });

            state.setReadingStates(initialReadingStates);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.formula?.id, state.pool]);

    const handleCalculatePressed = (): void => {
        Haptic.medium();
        dispatch(clearReadings());
        state.readingStates.forEach((rs) => {
            if (rs.isOn && rs.value !== undefined) {
                dispatch(recordInput(rs.reading, parseFloat(rs.value)));
            }
        });
        state.navigate.navigate('TreatmentList');
    };

    const handleSlidingStopped = (varName: string) => {
        state.setIsSliding(false);
        let isChanged = false;
        const rs = Util.deepCopy(state.readingStates);
        rs.forEach((r) => {
            if (r.reading.id === varName && !r.isOn) {
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
            state.setReadingStates(rs);
        }
    };

    const handleSlidingStarted = () => {
        state.setIsSliding(true);
    };

    const handleSliderUpdatedValue = (varName: string, value: number) => {
        const rs = Util.deepCopy(state.readingStates);
        let isChanged = false;
        rs.forEach((r) => {
            if (r.reading.id === varName) {
                const newValue = value.toFixed(r.reading.decimalPlaces);
                if (newValue !== r.value) {
                    isChanged = true;
                    r.value = newValue;
                }
            }
        });
        if (isChanged) {
            state.setReadingStates(rs);
            Haptic.bumpyGlide();
        }
    };

    const handleTextboxUpdated = (varName: string, text: string) => {
        const rs = Util.deepCopy(state.readingStates);
        rs.forEach((r) => {
            if (r.reading.id === varName) {
                r.value = text;
            }
        });
        state.setReadingStates(rs);
    };

    const handleTextboxDismissed = (varName: string, text: string) => {
        const rs = Util.deepCopy(state.readingStates);
        rs.forEach((r) => {
            if (r.reading.id === varName) {
                r.value = text;
                r.isOn = text.length > 0;
            }
        });
        state.setReadingStates(rs);
    };

    const handleIconPressed = (varName: string) => {
        Haptic.light();
        const rs = Util.deepCopy(state.readingStates);
        rs.forEach((r) => {
            if (r.reading.id === varName) {
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
        state.setReadingStates(rs);
    };

    // The first section is just a dummy header thing to enable some fancy scrolling behavior
    let sections: SectionListData<ReadingState>[] = [
        // dummy header
        { data: [], isHeader: true },
        // actual readings
        { data: state.readingStates, isHeader: false },
    ];

    return (
        <PDSafeAreaView style={ { flex: 1 } } bgColor="white" forceInset={ { bottom: 'never' } }>
            <ScreenHeader textType="heading" color="blue">Readings</ScreenHeader>
            <PDView style={ styles.container } bgColor="background">
                <KeyboardAwareSectionList
                    style={ StyleSheet.flatten([styles.sectionList, { backgroundColor: state.theme.colors.blurredBlue }]) }
                    scrollEnabled={ !state.isSliding }
                    keyboardDismissMode={ 'interactive' }
                    keyboardShouldPersistTaps={ 'handled' }
                    renderItem={ ({ item, index }) => (
                        <ReadingListItem
                            readingState={ item }
                            onTextboxUpdated={ handleTextboxUpdated }
                            onTextboxFinished={ handleTextboxDismissed }
                            onSlidingStart={ handleSlidingStarted }
                            onSlidingComplete={ handleSlidingStopped }
                            onSliderUpdatedValue={ handleSliderUpdatedValue }
                            handleIconPressed={ handleIconPressed }
                            inputAccessoryId={ keyboardAccessoryViewId }
                            index={ index }
                        />
                    ) }
                    sections={ sections }
                    keyExtractor={ (item) => item.reading.id }
                    contentInsetAdjustmentBehavior="always"
                    stickySectionHeadersEnabled={ false }
                    canCancelContentTouches={ true }
                    renderSectionHeader={ ({ section }) => {
                        if (section.isHeader) {
                            return <ReadingListHeader />;
                        } else {
                            return <></>;
                        }
                    } }
                />
                <PDView
                    style={ [
                        styles.bottomButtonContainer,
                        {
                            borderColor: state.theme.colors.border,
                            paddingBottom: state.insets.bottom,
                        },
                    ] }
                    bgColor="white">
                    <PlayButton onPress={ handleCalculatePressed } title="Calculate" />
                </PDView>
            </PDView>
            <KeyboardButton
                nativeID={ keyboardAccessoryViewId }
                bgColor={ 'blue' }
                textColor="white"
                onPress={ () => Keyboard.dismiss() }>
                Done Typing
            </KeyboardButton>
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
        borderTopWidth: 4,
        paddingHorizontal: PDSpacing.lg,
    },
});
