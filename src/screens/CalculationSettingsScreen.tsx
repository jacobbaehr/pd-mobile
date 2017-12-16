import * as React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';

import { dispatch } from '../Redux/AppState';
import { setFormula } from '../Redux/Actions';
import { Reading } from '../Models/Reading';
import { AppState } from '../Redux/Reducers';
import { Button } from '../components/Button';


interface CalculationSettingsScreenProps {
    navigation: NavigationScreenProp<{}, {}>;

    chlorineFormula?: string;
}

const mapStateToProps = (state: AppState, ownProps: CalculationSettingsScreenProps): CalculationSettingsScreenProps => {
    return {
        navigation: ownProps.navigation,
        chlorineFormula: state.chlorineFormula
    };
};

interface CalculationSettingsScreenState {
    text?: string;
}

/// Allows users to customize caluclation settings.
// TODO: pull these from a webserver & make them more dynamic (we're hard-coding initial values for now)
class CalculationSettingsScreenComponent extends React.Component<CalculationSettingsScreenProps, CalculationSettingsScreenState> {

    constructor(props: CalculationSettingsScreenProps) {
        super(props);

        this.state = {
            text: props.chlorineFormula
        };
    }

    private handleSave = () => {
        dispatch(setFormula(this.state.text));
    };

    render() {
        return(
            <View>
                <Text>Calcium Hypochlorite</Text>
                <TextInput 
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}/>
                <Button title={'Save'} onPress={this.handleSave} styles={styles.button} />
            </View>
        );
    }
}

export const CalculationSettingsScreen = connect(mapStateToProps)(CalculationSettingsScreenComponent);

const styles = StyleSheet.create({
    button: {
        alignSelf: 'stretch',
        backgroundColor: 'blue',
        height: 45,
        margin: 15
    }
});