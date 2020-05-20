import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import { PDNavStackParamList } from '~/navigator/Navigators';
import { ReadingEntry } from '~/models/logs/ReadingEntry';
import { TreatmentEntry } from '~/models/logs/TreatmentEntry';
import { Recipe } from '~/models/recipe/Recipe';
import { Pool } from '~/models/Pool';
import { AppState } from '~/redux/AppState';
import { Database } from '~/repository/Database';
import { CalculationService } from '~/services/CalculationService';
import { GradientButton } from '~/components/buttons/GradientButton';
import { LogEntry } from '~/models/logs/LogEntry';
import { RecipeRepo } from '~/repository/RecipeRepo';
import { RecipeKey } from '~/models/recipe/RecipeKey';

interface ResultsScreenProps {
    navigation: StackNavigationProp<PDNavStackParamList, 'Results'>;

    readings: ReadingEntry[];

    recipeKey: RecipeKey;

    pool: Pool;
}

interface ResultsScreenState {
    treatmentEntries: TreatmentEntry[];
    recipe?: Recipe
}

const mapStateToProps = (state: AppState, ownProps: ResultsScreenProps): ResultsScreenProps => {

    return {
        navigation: ownProps.navigation,
        readings: state.readingEntries,
        recipeKey: state.recipeKey!,
        pool: state.selectedPool!
    };
};

class ResultsScreenComponent extends React.Component<ResultsScreenProps, ResultsScreenState> {

    recipe?: Recipe;

    constructor(props: ResultsScreenProps) {
        super(props);

        console.log('1');
        this.state = { treatmentEntries: [] };
    }

    async componentDidMount() {
        this.recipe = await RecipeRepo.loadLocalRecipeWithKey(this.props.recipeKey);
        const treatmentEntries = CalculationService.calculateTreatments(this.recipe, this.props.pool, this.props.readings);
        console.log('2');
        this.setState({
            treatmentEntries,
            recipe: this.recipe
        });
    }

    save = async () => {
        const id = Math.random().toString(36).slice(2);
        const ts = new Date().getTime();
        const logEntry = LogEntry.make(id, this.props.pool.objectId, ts, this.props.readings, this.state.treatmentEntries, this.props.recipeKey);
        console.log(logEntry);
        await Database.saveNewLogEntry(logEntry);

        this.props.navigation.popToTop();
    }

    render() {
        let treatmentString = '';
        this.state.treatmentEntries.forEach(treatmentEntry => {
            treatmentString += `\nAdd ${treatmentEntry.amount} ounces of ${treatmentEntry.treatmentName}`;
        });

        return (
            <View style={ styles.container }>
                <Text style={ styles.text }>
                    { treatmentString }
                </Text>
                <GradientButton title={ 'save' } onPress={ this.save } containerStyles={ styles.button } />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'orange'
    },
    text: {
        margin: 15,
        justifyContent: 'center',
        color: 'white'
    },
    button: {
        marginHorizontal: 15,
        height: 100
    }
});

export const ResultsScreen = connect(mapStateToProps)(ResultsScreenComponent);
