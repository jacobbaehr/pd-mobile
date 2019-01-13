import * as React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { AppState } from '../redux/AppState';
import { InputEntry } from '../models/recipe/InputEntry';
import { OutputEntry } from '../models/recipe/OutputEntry';
import { Recipe } from '../models/recipe/Recipe';
import { CalculationService } from '../services/CalculationService';
import { Database } from '../models/Database';

interface ResultsScreenProps {
    navigation: NavigationScreenProp<{}, {}>;

    readings: InputEntry[];

    recipeId: string;

    poolId: string;
}

interface ResultsScreenState { 
    treatments: OutputEntry[];
}

const mapStateToProps = (state: AppState, ownProps: ResultsScreenProps): ResultsScreenProps => {

    return {
        navigation: ownProps.navigation,
        readings: state.inputs,
        recipeId: state.recipeId!,
        poolId: state.selectedPoolId!
    };
};

class ResultsScreenComponent extends React.Component<ResultsScreenProps, ResultsScreenState> {

    recipe: Recipe;

    constructor(props: ResultsScreenProps) {
        super(props);

        this.recipe = Database.loadRecipe(this.props.recipeId);
        console.log('1');
        const pool = Database.loadPool(this.props.poolId);
        const treatments = CalculationService.calculateTreatments(this.recipe, pool, props.readings);
        console.log('2');
        this.state = { treatments };
    }

    render() {
        let treatmentString = '';
        this.state.treatments.forEach(treatment => {
            treatmentString += `\nAdd ${treatment.value} ounces of ${treatment.output.name}`;
        });

        return(
            <View style={styles.container}>
                <Text style={styles.text}>
                    {treatmentString}
                </Text>
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
    }
});

export const ResultsScreen = connect(mapStateToProps)(ResultsScreenComponent);
