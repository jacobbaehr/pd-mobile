import * as React from 'react';
import { Alert, Linking, SectionList, StyleSheet } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { connect } from 'react-redux';
import { PDText } from '~/components/PDText';
import { useRecipeHook } from '~/hooks/RealmPoolHook';
import { Pool } from '~/models/Pool';
import { RecipeMeta } from '~/models/recipe/RecipeMeta';
import { PDNavParams } from '~/navigator/shared';
import { AppState } from '~/redux/AppState';
import { Config } from '~/services/Config';
import { RecipeAPI } from '~/services/gql/RecipeAPI';
import { RecipeService } from '~/services/RecipeService';
import { RS } from '~/services/RecipeUtil';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RecipeListHeader } from './RecipeListHeader';
import { RecipeListItem } from './RecipeListItem';

interface RecipeListScreenProps {
    // The selected pool
    pool: Pool | null;
}

const mapStateToProps = (state: AppState): RecipeListScreenProps => {
    return {
        pool: state.selectedPool,
    };
};

const RecipeListScreenComponent: React.FunctionComponent<RecipeListScreenProps> = (props) => {
    const { data } = RecipeAPI.useRecipeList();
    const { navigate, goBack } = useNavigation<StackNavigationProp<PDNavParams, 'RecipeList'>>();
    const currentRecipe = useRecipeHook(props.pool?.recipeKey || RecipeService.defaultRecipeKey);
    const { params } = useRoute<RouteProp<PDNavParams, 'RecipeList'>>();

    const handleUpdatePressed = () => {
        Linking.openURL(Config.appStoreListing);
    };

    const promptUpdate = () => {
        Alert.alert(
            'Update Required',
            'This recipe requires a newer app version. Update now?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Update',
                    onPress: handleUpdatePressed,
                    style: 'default',
                },
            ],
            { cancelable: true },
        );
    };

    const handleRecipeSelected = (recipe: RecipeMeta): void => {
        if (RS.needUpdateToUseRecipe(recipe, Config.version)) {
            promptUpdate();
        } else {
            const key = RS.getKey(recipe);
            navigate('RecipeDetails', { recipeKey: key, prevScreen: params.prevScreen });
        }
    };

    const currentMeta: RecipeMeta = {
        name: currentRecipe?.name || 'loading...',
        ts: currentRecipe?.ts || 0,
        id: currentRecipe?.id || '',
        desc: currentRecipe?.description || '',
        appVersion: currentRecipe?.appVersion || '1.0.0',
    };

    const handleBackPressed = () => {
        goBack();
    };

    if (props.pool === null) {
        return <></>;
    }

    const sections = [
        {
            title: 'Current',
            data: [currentMeta],
        },
        {
            title: 'Community Recipes',
            data: data?.listRecipes || [],
        },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} forceInset={{ bottom: 'never' }}>
            <RecipeListHeader handleBackPress={handleBackPressed} pool={props.pool} />
            <SectionList
                style={styles.scrollView}
                sections={sections}
                renderItem={({ item }) => (
                    <RecipeListItem recipe={item} onRecipeSelected={handleRecipeSelected} key={item.id} />
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <PDText type="default" style={styles.sectionTitle}>
                        {title}
                    </PDText>
                )}
                contentInset={{ bottom: 34 }}
                stickySectionHeadersEnabled={false}
            />
        </SafeAreaView>
    );
};

export const RecipeListScreen = connect(mapStateToProps)(RecipeListScreenComponent);

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#F2F9F9',
    },
    sectionTitle: {
        marginTop: 12,
        marginLeft: 16,
        fontSize: 28,
        fontWeight: '700',
        color: 'black',
    },
});
