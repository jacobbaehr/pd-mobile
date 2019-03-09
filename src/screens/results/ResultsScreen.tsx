import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';

import { ReadingEntry } from 'models/logs/ReadingEntry';
import { TreatmentEntry } from 'models/logs/TreatmentEntry';
import { Recipe } from 'models/recipe/Recipe';
import { Pool } from 'models/Pool';
import { AppState } from 'redux/AppState';
import { Database } from 'repository/Database';
import { CalculationService } from 'services/CalculationService';
import { GradientButton } from 'components/buttons/GradientButton';
import { LogEntry } from 'models/logs/LogEntry';
import { RecipeRepository } from 'repository/RecipeRepository';

interface ResultsScreenProps {
    navigation: NavigationScreenProp<{}, {}>;

    readings: ReadingEntry[];

    recipeId: string;

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
        recipeId: state.recipeId!,
        pool: state.selectedPool!
    };
};

class ResultsScreenComponent extends React.Component<ResultsScreenProps, ResultsScreenState> {

    recipe?: Recipe;
    recipeRepo: RecipeRepository;

    constructor(props: ResultsScreenProps) {
        super(props);

        this.recipeRepo = new RecipeRepository();
        console.log('1');
        this.state = { treatmentEntries: [] };
    }

    async componentDidMount() {
        this.recipe = await this.recipeRepo.loadLocalRecipeWithId(this.props.recipeId);
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
        const logEntry = LogEntry.make(id, this.props.pool.objectId, ts, this.props.readings, this.state.treatmentEntries, this.props.recipeId);
        console.log(logEntry);
        await Database.saveNewLogEntry(logEntry);

        this.props.navigation.popToTop();
    }

    render() {
        let treatmentString = '';
        this.state.treatmentEntries.forEach(treatmentEntry => {
            treatmentString += `\nAdd ${treatmentEntry.amount} ounces of ${treatmentEntry.treatmentName}`;
        });

        return(
            <View style={styles.container}>
                <Text style={styles.text}>
                    {treatmentString}
                </Text>
                <GradientButton title={'save'} onPress={this.save} containerStyles={styles.button}/>
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
