import * as React from 'react';
import { SectionList, SectionListData, StyleSheet, View } from 'react-native';
import { NavigationScreenProp, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

import { Button } from 'components/buttons/Button';
import { Input } from 'models/recipe/Input';
import { InputEntry } from 'models/recipe/InputEntry';
import { Recipe } from 'models/recipe/Recipe';
import { Pool } from 'models/Pool';
import { AppState } from 'redux/AppState';
import { Database } from 'repository/Database';
import { ReadingListHeader } from './ReadingListHeader';

import { InputEntryListItem } from './InputEntryListItem';
import { ReadingListSectionHeader } from './ReadingListSectionHeader';

interface InputEntryListScreenState { }

interface InputEntryListScreenProps {
    navigation: NavigationScreenProp<{}, {}>;
    entries: InputEntry[];
    recipeId: string;
    pool: Pool;
}

const mapStateToProps = (state: AppState, ownProps: InputEntryListScreenProps): InputEntryListScreenProps => {
    return {
        navigation: ownProps.navigation,
        entries: state.inputs,
        recipeId: state.recipeId!,
        pool: state.selectedPool!
    };
};

class InputEntryListScreenComponent extends React.Component<InputEntryListScreenProps, InputEntryListScreenState> {
    pool: Pool;
    recipe: Recipe;

    constructor(props: InputEntryListScreenProps) {
        super(props);

        this.recipe = Database.loadRecipe(props.recipeId);
        this.pool = Database.loadPool(props.pool);
    }

    getRemainingInputs = (): Input[] => {
        return this.recipe.inputs.filter(input => {
            let inputComplete = false;
            this.props.entries.forEach(entry => {
                if (entry.inputID === input.objectId) {
                    inputComplete = true;
                }
            });
            return !inputComplete;
        });
    }

    handleInputSelected = (input: Input, inputEntry?: InputEntry): void => {
        this.props.navigation.navigate('Details', { input, inputEntry });
    }

    handleCalculatePressed = (): void => {
        this.props.navigation.navigate('Results');
    }

    handlePoolSelectPressed = (): void => {
        this.props.navigation.navigate('Pool');
    }

    handleBackPressed = (): void => {
        this.props.navigation.goBack();
    }

    private getEntryForInput = (input: Input): InputEntry | undefined => {
        // array length will always be 0 (if entry not made) or 1 (if entry made)
        const entriesForInput = this.props.entries.filter(entry => entry.inputID === input.objectId);
        if (entriesForInput.length === 0) { return undefined; }
        return entriesForInput[0];
    }

    render() {
        const remaining = this.getRemainingInputs();
        // TODO: clean this up
        const completed = this.recipe.inputs.filter(input =>
            remaining.filter(incomplete =>
                incomplete.objectId === input.objectId
            ).length === 0
        );

        const progress = (this.recipe.inputs.length === 0)
            ? 1
            : (completed.length / this.recipe.inputs.length);

        const hasTakenEveryReading = completed.length === this.recipe.inputs.length;

        const sections: SectionListData<Input>[] = [{ data: remaining, title: 'Remaining Readings' }];
        if (completed.length > 0) {
            sections.push({ data: completed, title: 'Completed Readings' });
        }

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8F8' }} forceInset={{ bottom: 'never', top: 'never' }}>
                <View style={styles.container}>
                    <SectionList
                        style={{ flex: 1 }}
                        ListHeaderComponent={<ReadingListHeader handleBackPress={this.handleBackPressed} pool={this.pool} percentComplete={progress} />}
                        renderItem={({ item }) => <InputEntryListItem input={item} inputEntry={this.getEntryForInput(item)} onInputSelected={this.handleInputSelected} />}
                        renderSectionHeader={({ section }) => <ReadingListSectionHeader title={section.title} />}
                        sections={sections}
                        keyExtractor={item => (item as Input).objectId}
                        contentInsetAdjustmentBehavior={'always'}
                        stickySectionHeadersEnabled={false} />
                    <Button
                        styles={styles.button}
                        onPress={this.handleCalculatePressed}
                        title='Calculate'
                        disabled={!hasTakenEveryReading} />
                </View>
            </SafeAreaView>
        );
    }
}

export const InputEntryListScreen = connect(mapStateToProps)(InputEntryListScreenComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#F8F8F8',
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: '#005C9E',
        height: 45,
        margin: 5
    }
});
