import { formatDistanceStrict } from 'date-fns';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { SVG } from '~/assets/images';
import { PDText } from '~/components/PDText';
import { PDSpacing } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';
import { useLoadRecipeHook, useRealmPoolHistoryHook } from '~/hooks/RealmPoolHook';
import { PDNavParams } from '~/navigator/shared';
import { useTypedSelector } from '~/redux/AppState';
import { RecipeService } from '~/services/RecipeService';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ChipButton } from '~/screens/home/ChipButton';
import { Haptic } from '~/services/HapticService';
import { VolumeUnitsUtil } from '~/services/VolumeUnitsUtil';
import { PlayButton } from '~/components/buttons/PlayButton';

/**
 * Displays info about the recipe & customizations in the SectionList on the pool details screen.
 */
const PoolServiceConfigSection = () => {
    const { navigate } = useNavigation<StackNavigationProp<PDNavParams>>();
    const selectedPool = useTypedSelector(state => state.selectedPool);
    const recipe = useLoadRecipeHook(selectedPool?.recipeKey || RecipeService.defaultFormulaKey);
    const history = useRealmPoolHistoryHook(selectedPool?.objectId ?? null);
    const deviceSettings = useTypedSelector((state) => state.deviceSettings);

    if (!selectedPool) { return <></>; }

    const navigateToCustomTargets = () => {
        navigate('CustomTargets', { prevScreen: 'EditPoolNavigator' });
    };

    const navigateToReadings = () => {
        Haptic.heavy();
        navigate('ReadingList');
    };

    const getLastTimeUpdate = () =>
        history.length > 0
            ? `Last Serviced: ${formatDistanceStrict(history[0].ts, Date.now())} ago`
            : '';

    const abbreviateVolume = VolumeUnitsUtil.getDisplayVolume(selectedPool.gallons, deviceSettings);

    return (
        <>
            <PDView bgColor="white" style={ styles.container }>
            <PDText type="subHeading" numberOfLines={ 0 }>{selectedPool.name}</PDText>
            <PDView>
                <PDView style={ styles.row }>
                <PDView style={ styles.sectionIcon }>
                    <SVG.IconWater height={ 16 } width={ 16 } />
                </PDView>
                <PDText type="bodyBold" color="greyDark">
                    {abbreviateVolume}
                </PDText>
                </PDView>
                <PDView>
                    <PDView>
                        <PDText type="bodyBold" color="black" style={ styles.subTitle }>
                            formula
                        </PDText>
                        <PDView style={ styles.row }>
                            <PDView style={ styles.sectionIcon }>
                                <SVG.IconBeaker height={ 16 } width={ 16 }/>
                            </PDView>
                            <PDText type="bodyBold" color="greyDark" numberOfLines={ 1 } ellipsizeMode="tail">
                                {recipe?.name}
                            </PDText>
                        </PDView>
                    </PDView>
                    <PDView>
                        <PDText type="bodyBold" color="black"  style={ styles.subTitle }>
                            Target Levels
                        </PDText>
                        <ChipButton title="Customize" onPress={ navigateToCustomTargets } icon="levels" />
                    </PDView>
                </PDView>
            </PDView>
            <PlayButton onPress={ navigateToReadings } title="Enter Readings" />
            <PDText type="content" style={ styles.lastUpdateText } color="greyDark">
                { getLastTimeUpdate() }
            </PDText>
        </PDView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: PDSpacing.md,
        paddingTop: PDSpacing.md,
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 2,
    },
    subTitle: {
        lineHeight: 21,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        // This width it's required for ellipsizeMode
        width: Dimensions.get('window').width * 0.8,
    },
    sectionIcon: {
        marginRight: 4,
    },
    lastUpdateText: {
        marginBottom: PDSpacing.md,
    },
});

export default PoolServiceConfigSection;
