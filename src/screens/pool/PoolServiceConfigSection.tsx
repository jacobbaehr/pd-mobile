import { formatDistanceStrict } from 'date-fns';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { images } from '~/assets/images';
import { BoringButton } from '~/components/buttons/BoringButton';
import { PDText } from '~/components/PDText';
import { useRealmPoolHistoryHook, useRecipeHook } from '~/hooks/RealmPoolHook';
import { Pool } from '~/models/Pool';
import { PDNavParams } from '~/navigator/shared';
import { AppState } from '~/redux/AppState';
import { getCustomTargetsBySelectedPool } from '~/redux/selectedPool/Selectors';
import { RecipeService } from '~/services/RecipeService';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

/**
 * Displays info about the recipe & customizations in the SectionList on the pool details screen.
 */
const PoolServiceConfigSection = () => {
    const { navigate } = useNavigation<StackNavigationProp<PDNavParams>>();
    const selectedPool = useSelector<AppState>((state) => state.selectedPool) as Pool;
    const recipe = useRecipeHook(selectedPool?.recipeKey || RecipeService.defaultRecipeKey);
    const customTargets = useSelector((state: AppState) => getCustomTargetsBySelectedPool(state, recipe));
    const history = useRealmPoolHistoryHook(selectedPool?.objectId);

    const isEmptyCustom = customTargets?.length === 0;

    const navigateToCustomTargets = () => {
        navigate('CustomTargets', {
            customTargets,
        });
    };

    const navigateToRecipes = () => {
        navigate('RecipeList', { prevScreen: 'PoolScreen' });
    };

    const navigateToReadings = () => {
        navigate('ReadingList');
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

    return (
        <View style={styles.container}>
            <View>
                <PDText type="default" style={styles.title}>
                    Service Config
                </PDText>
                <View>
                    <View>
                        <PDText type="default" style={styles.subTitle}>
                            Recipe
                        </PDText>
                        <TouchableOpacity onPress={navigateToRecipes}>
                            <View style={styles.row}>
                                <Text style={styles.buttonResults} numberOfLines={1} ellipsizeMode="tail">
                                    {recipe?.name}
                                </Text>
                                <Image source={images.rightArrow} height={21} width={22} style={styles.arrowImage} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    {isEmptyCustom || (
                        <View>
                            <PDText type="default" style={styles.subTitle}>
                                Custom Targets
                            </PDText>
                            <TouchableOpacity onPress={navigateToCustomTargets}>
                                <View style={styles.row}>
                                    <Text style={styles.buttonResults} numberOfLines={1} ellipsizeMode="tail">
                                        {getCustomTargets()}
                                    </Text>
                                    <Image
                                        source={images.rightArrow}
                                        height={21}
                                        width={22}
                                        style={styles.arrowImage}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
            <BoringButton title="Start Service" onPress={navigateToReadings} containerStyles={styles.buttonContainer} />
            <PDText type="default" style={styles.lastUpdateText}>
                {lastTimeUpdate()}
            </PDText>
        </View>
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
    navRow: {
        flexDirection: 'row',
    },
    poolVolumeText: {
        color: 'rgba(0,0,0,0.6)',
        fontSize: 18,
        fontWeight: '600',
    },
    editButtonContainer: {
        alignSelf: 'center',
    },
    backButtonContainer: {
        flexGrow: 1,
    },
    editButton: {
        backgroundColor: 'rgba(30,107,255,.1)',
        borderRadius: 15,
    },
    editButtonText: {
        color: '#2D5FFF',
        textAlign: 'center',
        marginTop: '2%',
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        fontWeight: '700',
        paddingHorizontal: 15,
        paddingVertical: 3,
    },
    recipeLinkNormal: {
        backgroundColor: 'transparent',
        color: '#3910E8',
        fontSize: 18,
        textDecorationLine: 'underline',
    },
    buttonContainer: {
        backgroundColor: '#00B25C',
        marginBottom: 12,
    },
    buttonText: {
        fontSize: 18,
        lineHeight: 27,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    arrowImage: {
        alignSelf: 'center',
        marginLeft: 8,
    },
    buttonResults: {
        fontSize: 16,
        lineHeight: 24,
        color: '#1E6BFF',
        fontStyle: 'normal',
        fontWeight: 'bold',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 27,
        color: '#000',
        marginBottom: 12,
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
        marginBottom: 10,
        width: Dimensions.get('window').width * 0.8,
    },

    lastUpdateText: {
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 24,
        color: '#8C8C8C',
        marginBottom: 18,
    },
});

export default PoolServiceConfigSection;
