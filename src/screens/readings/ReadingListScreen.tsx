import * as React from 'react';
import { View, StyleSheet, SectionList, SectionListData, LayoutAnimation } from 'react-native';
import { NavigationScreenProp, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

import { Button } from 'components/buttons/Button';
import { ReadingListItem } from './ReadingListItem';
import { AppState } from '../../redux/AppState';
import { Reading } from '../../models/recipe/Reading';
import { Recipe } from '../../models/recipe/Recipe';
import { ReadingEntry } from '../../models/logs/ReadingEntry';
import { RecipeRepository } from 'repository/RecipeRepository';
import { ReadingListHeader } from './ReadingListHeader';
import { Pool } from '../../models/Pool';
import { ReadingListSectionHeader } from './ReadingListSectionHeader';

interface ReadingListScreenState {
    activeReadingId?: string;
    recipe?: Recipe;
}

interface ReadingListScreenProps {
    navigation: NavigationScreenProp<{}, {}>;
    entries: ReadingEntry[];
    recipeId: string;
    pool: Pool;
}

const mapStateToProps = (state: AppState, ownProps: ReadingListScreenProps): ReadingListScreenProps => {
    return {
        navigation: ownProps.navigation,
        entries: state.readingEntries,
        recipeId: state.recipeId!,
        pool: state.selectedPool!
    };
};

class ReadingListScreenComponent extends React.Component<ReadingListScreenProps, ReadingListScreenState> {

    recipeRepo: RecipeRepository;

    constructor(props: ReadingListScreenProps) {
        super(props);
        this.state = {
            activeReadingId: undefined
        };
        this.recipeRepo = new RecipeRepository();
    }

    async componentDidMount() {
        try {
            const recipe = await this.recipeRepo.loadLocalRecipeWithId(this.props.recipeId);
            this.setState({ recipe });
        } catch (e) {
            console.error(e);
        }
    }

    getRemainingReadings = (): Reading[] => {
        const recipe = this.state.recipe;
        if (recipe === undefined) {
            return [];
        }
        return recipe.readings.filter(reading => {
            let inputComplete = false;
            this.props.entries.forEach(entry => {
                if (entry.readingId === reading.objectId) {
                    inputComplete = true;
                }
            });
            return !inputComplete;
        });
    }

    handleReadingSelected = (input: Reading, inputEntry?: ReadingEntry): void => {
        const springAnimationProperties = {
            type: LayoutAnimation.Types.spring,
            property: LayoutAnimation.Properties.scaleXY,
            springDamping: 0.7
          };
        //   const fadeAnimationProperties = {
        //     type: LayoutAnimation.Types.spring,
        //     property: LayoutAnimation.Properties.opacity,
        //     springDamping: 0.3
        //   };
        const animationConfig = {
            duration: 500, // how long the animation will take
            create: undefined,
            update: springAnimationProperties,
            delete: undefined
          };
        LayoutAnimation.configureNext(animationConfig);
        this.setState({
            activeReadingId: input.objectId
        });
    }

    handleInputReadingSelected = (reading: Reading, readingEntry?: ReadingEntry): void => {
        this.props.navigation.navigate('Details', { reading, readingEntry });
    }

    handleCalculatePressed = (): void => {
        this.props.navigation.navigate('Results');
    }

    handleBackPressed = (): void => {
        this.props.navigation.goBack();
    }

    private getEntryForReading = (reading: Reading): ReadingEntry | undefined => {
        // array length will always be 0 (if entry not made) or 1 (if entry made)
        let entriesForInput = this.props.entries.filter(entry => entry.readingId === reading.objectId);
        if (entriesForInput.length === 0) { return undefined }
        return entriesForInput[0];
    }

    render() {
        const remaining = this.getRemainingReadings();
        let sections: SectionListData<Reading>[] = [{data: remaining, title: 'Remaining Readings'}];
        let completed: Reading[] = [];
        let hasTakenEveryReading = false;
        let progress = 0;

        const recipe = this.state.recipe;
        if (recipe !== undefined) {
            // TODO: clean this up
            const completed = recipe.readings.filter(reading => 
                remaining.filter(incomplete => 
                    incomplete.objectId == reading.objectId
                ).length == 0
            );

            progress = (recipe.readings.length == 0)
                ? 1
                : (completed.length / recipe.readings.length);

            hasTakenEveryReading = completed.length == recipe.readings.length;

            let sections: SectionListData<Reading>[] = [{data: remaining, title: 'Remaining Readings'}];
            if (completed.length > 0) {
                sections.push({data: completed, title: 'Completed Readings'});
            }
        }

        return(
            <SafeAreaView style={{flex: 1, backgroundColor: '#F8F8F8'}} forceInset={{ bottom: 'never', top: 'never' }}>
            <View style={styles.container}>
                <SectionList
                    style={styles.sectionList}
                    ListHeaderComponent={<ReadingListHeader handleBackPress={this.handleBackPressed } pool={this.props.pool} percentComplete={progress} />}
                    renderItem={({item}) => <ReadingListItem reading={item} readingEntry={this.getEntryForReading(item)} onReadingSelected={this.handleReadingSelected} onInputReadingSelected={this.handleInputReadingSelected} isActive={this.state.activeReadingId == item.objectId} />}
                    renderSectionHeader={({section}) => <ReadingListSectionHeader title={section.title} />}
                    sections={sections}
                    keyExtractor={item => (item as Reading).objectId}
                    contentInsetAdjustmentBehavior={'always'}
                    stickySectionHeadersEnabled={false}
                />
                <Button
                    styles={styles.button}
                    onPress={this.handleCalculatePressed}
                    title="Calculate"
                    disabled={!hasTakenEveryReading}
                />
            </View>
            </SafeAreaView>
        );
    }
}

export const ReadingListScreen = connect(mapStateToProps)(ReadingListScreenComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#F8F8F8',
    },
    sectionList: {
        flex: 1
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: '#005C9E',
        height: 45,
        margin: 5
    }
});
