import * as React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { AppState } from '../Redux/AppState';
import { InputEntry } from '../Models/Recipe/InputEntry';
import { OutputEntry } from '../Models/Recipe/OutputEntry';
import { Recipe } from '../Models/Recipe/Recipe';
import { CalculationService } from '../Services/CalculationService';
import { Database } from '../Models/Database';

interface ResultsScreenProps {
    navigation: NavigationScreenProp<{}, {}>;

    readings: InputEntry[];

    recipeId: string;
}

interface ResultsScreenState { 
    treatments: OutputEntry[];
}

const mapStateToProps = (state: AppState, ownProps: ResultsScreenProps): ResultsScreenProps => {

    const filteredReadings = state.inputs.filter(input => (input.value !== null) && (input.value !== undefined));

    return {
        navigation: ownProps.navigation,
        readings: filteredReadings,
        recipeId: state.recipeId!
    };
};

class ResultsScreenComponent extends React.Component<ResultsScreenProps, ResultsScreenState> {

    recipe: Recipe;

    constructor(props: ResultsScreenProps) {
        super(props);

        this.recipe = Database.loadRecipe(this.props.recipeId);
        const treatments = CalculationService.calculateTreatments(this.recipe, props.readings);
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
