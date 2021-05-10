import { formatDistanceStrict } from 'date-fns';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { SVG } from '~/assets/images';
import { BoringButton } from '~/components/buttons/BoringButton';
import { PDText } from '~/components/PDText';
import { PDView } from '~/components/PDView';
import { useLoadRecipeHook, useRealmPoolHistoryHook } from '~/hooks/RealmPoolHook';
import { Pool } from '~/models/Pool';
import { getDisplayForWaterType } from '~/models/Pool/WaterType';
import { PDNavParams } from '~/navigator/shared';
import { AppState, useTypedSelector } from '~/redux/AppState';
import { getCustomTargetsBySelectedPool } from '~/redux/selectedPool/Selectors';
import { RecipeService } from '~/services/RecipeService';
import { Util } from '~/services/Util';

import { useNavigation, useNavigationState } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { VolumeEstimatorHelpers } from './editOrCreate/volumeEstimator/VolumeEstimatorHelpers';

/**
 * Displays info about the recipe & customizations in the SectionList on the pool details screen.
 */
const PoolServiceConfigSection = () => {
    const { navigate } = useNavigation<StackNavigationProp<PDNavParams>>();
    const navigationState = useNavigationState((state) => state.routeNames);
    const selectedPool = useSelector<AppState>((state) => state.selectedPool) as Pool;
    const recipe = useLoadRecipeHook(selectedPool?.recipeKey || RecipeService.defaultRecipeKey);
    const customTargets = useSelector((state: AppState) => getCustomTargetsBySelectedPool(state, recipe));
    const history = useRealmPoolHistoryHook(selectedPool?.objectId);
    const deviceSettings = useTypedSelector((state) => state.deviceSettings);

    const isEmptyCustom = customTargets?.length === 0;

    const navigateToCustomTargets = () => {
        navigate('CustomTargets', { prevScreen: 'PDPoolNavigator' });
    };

    const navigateToRecipes = () => {
        const screenName = navigationState?.includes('EditOrCreatePoolScreen')
            ? 'EditOrCreatePoolScreen'
            : 'PoolScreen';
        navigate('RecipeList', { prevScreen: screenName });
    };

    const navigateToReadings = () => {
        navigate('ReadingList');
    };

    const navigateToEditPool = () => {
        navigate('EditPoolNavigator');
    };

    const getCustomTargets = () => {
        let customNames = '';
        if (customTargets?.length > 0) {
            const lastIndex = customTargets.length - 1;
            customNames = customTargets.reduce((acm, { name }, i) => {
                if (i === 0) {
                    acm += `${name}`;
                } else if (i === lastIndex) {
                    acm += ` and ${name}`;
                } else {
                    acm += `, ${name} `;
                }
                return acm;
            }, '');
        }
        return customNames;
    };

    const lastTimeUpdate = () =>
        history.length > 0 ? `Last Serviced: ${formatDistanceStrict(history[0].ts, Date.now())} ago` : '';

    const abbreviateGallons = `${Util.abbreviate(selectedPool.gallons)} ${VolumeEstimatorHelpers.getResultLabelForUnit(
        deviceSettings.units,
    )}, ${getDisplayForWaterType(selectedPool.waterType)}`;

    return (
        <>
            <PDView bgColor="white" style={ styles.poolNameContainer }>
                <PDText type="heading" numberOfLines={ 4 }>{selectedPool.name}</PDText>
            </PDView>
            <PDView style={ styles.container }>
                <PDView>
                    <PDText type="bodySemiBold" style={ [styles.subTitle, { marginBottom: 4 }] }>
                        water
                    </PDText>
                    <TouchableOpacity onPress={ navigateToEditPool }>
                        <PDView style={ styles.row }>
                            <PDView style={ styles.buttonText }>
                                <SVG.IconInformation height={ 21 } width={ 22 } fill="#1E6BFF" />
                            </PDView>
                            <PDText type="bodyBold" color="blue">
                                {abbreviateGallons}
                            </PDText>
                        </PDView>
                    </TouchableOpacity>
                    <PDView>
                        <PDView>
                            <PDText type="bodySemiBold" style={ styles.subTitle }>
                                formula
                            </PDText>
                            <TouchableOpacity onPress={ navigateToRecipes }>
                                <PDView style={ styles.row }>
                                    <PDText type="bodyBold" color="blue" numberOfLines={ 1 } ellipsizeMode="tail" style={ styles.buttonText }>
                                        {recipe?.name}
                                    </PDText>
                                    <SVG.IconCircleForward height={ 21 } width={ 22 } fill="#1E6BFF" />
                                </PDView>
                            </TouchableOpacity>
                        </PDView>
                        {isEmptyCustom || (
                            <PDView>
                                <PDText type="bodySemiBold" style={ styles.subTitle }>
                                    Custom Targets
                                </PDText>
                                <TouchableOpacity onPress={ navigateToCustomTargets }>
                                    <PDView style={ styles.row }>
                                        <PDText type="bodyBold" color="blue" numberOfLines={ 1 } ellipsizeMode="tail" style={ styles.buttonText }>
                                            {getCustomTargets()}
                                        </PDText>
                                        <SVG.IconCircleForward height={ 21 } width={ 22 } fill="#1E6BFF" />
                                    </PDView>
                                </TouchableOpacity>
                            </PDView>
                        )}
                    </PDView>
                </PDView>
                <BoringButton
                    title="Start Service"
                    onPress={ navigateToReadings }
                    containerStyles={ styles.buttonContainer }
                />
                <PDText type="default" style={ styles.lastUpdateText }>
                    {lastTimeUpdate()}
                </PDText>
            </PDView>
        </>
    );
};

const border = {
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 2,
};

const styles = StyleSheet.create({
    container: {
        ...border,
        backgroundColor: '#fff',
        flexDirection: 'column',
        paddingHorizontal: 18,
        paddingTop: 18,
    },
    buttonContainer: {
        backgroundColor: '#00B25C',
        marginBottom: 12,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 27,
        color: '#000',
        marginBottom: 8,
    },
    subTitle: {
        fontWeight: 'bold',
        fontStyle: 'normal',
        fontSize: 18,
        lineHeight: 27,
        color: '#8C8C8C',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        // This witdh it's required for ellipsizeMode
        width: Dimensions.get('window').width * 0.8,
    },
    buttonText: {
        marginRight: 4,
    },
    lastUpdateText: {
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 24,
        color: '#8C8C8C',
        marginBottom: 18,
    },
    poolNameContainer: {
        paddingHorizontal: 18,
        paddingTop: 18,
    },
});

export default PoolServiceConfigSection;
