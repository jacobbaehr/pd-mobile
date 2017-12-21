import * as React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { dispatch } from '../Redux/AppState';
import { setReading } from '../Redux/Actions';
import { AppState } from '../Redux/AppState';
import { Reading } from '../Models/Reading';
import { Treatment } from '../Models/Treatment';
import { CalculationService } from '../Services/CalculationService';

interface ResultsScreenProps {
    navigation: NavigationScreenProp<{}, {}>;

    readings: Reading[];

    chlorineFormula: string;
}

interface ResultsScreenState { 
    treatments: Treatment[];
}

const mapStateToProps = (state: AppState, ownProps: ResultsScreenProps): ResultsScreenProps => {

    const filteredReadings = state.readings.filter(reading => (reading.value !== null) && (reading.value !== undefined));

    return {
        navigation: ownProps.navigation,
        readings: filteredReadings,
        chlorineFormula: state.chlorineFormula
    };
};

class ResultsScreenComponent extends React.Component<ResultsScreenProps, ResultsScreenState> {    
    constructor(props: ResultsScreenProps) {
        super(props);

        const treatments = CalculationService.calculateTreatments(this.props.readings, this.props.chlorineFormula);
        this.state = { treatments };
    }

    render() {
        let treatmentString = '';
        this.state.treatments.forEach(treatment => {
            treatmentString += `\nAdd ${treatment.amount} ounces of ${treatment.name}`;
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
