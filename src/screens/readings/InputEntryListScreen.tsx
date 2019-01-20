import * as React from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Button } from '../../components/Button';
import { InputEntryListItem } from './InputEntryListItem';
import { AppState } from '../../redux/AppState';
import { Input } from '../../models/recipe/Input';
import { Recipe } from '../../models/recipe/Recipe';
import { InputEntry } from '../../models/recipe/InputEntry';
import { Database } from '../../models/Database';

interface InputEntryListScreenState {
    recipe: Recipe
}

interface InputEntryListScreenProps {
    navigation: NavigationScreenProp<{}, {}>;
    entries: InputEntry[];
    recipeId: string;
}

const mapStateToProps = (state: AppState, ownProps: InputEntryListScreenProps): InputEntryListScreenProps => {
    return {
        navigation: ownProps.navigation,
        entries: state.inputs,
        recipeId: state.recipeId!
    };
};

class InputEntryListScreenComponent extends React.Component<InputEntryListScreenProps, InputEntryListScreenState> {

    constructor(props: InputEntryListScreenProps) {
        super(props);

        let recipe = Database.loadRecipe(props.recipeId);
        
        this.state = { recipe }
    }

    static navigationOptions = (navigationOptions: any) => {
        const state = navigationOptions.navigation.state;
        
        const params = (state.params !== undefined)
            ? state.params
            : {onPressSettings: () => {}};
        
        return {
            title: 'Readings',
            headerTintColor: 'lightgrey',
            headerStyle: { 
              backgroundColor: '#060D16',
              shadowOpacity: 0,
              elevation: 0,
              shadowColor: 'transparent',
            },
            headerRight: <Icon onPress={params.onPressSettings} name={'cog'} style={styles.settingIcon}></Icon>
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({ onPressSettings: this.onPressSettings });
    }

    private onPressSettings = () => {
        this.props.navigation.navigate('Settings');
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

    private getEntryForInput = (input: Input): InputEntry | undefined => {
        // array length will always be 0 (if entry not made) or 1 (if entry made)
        let entriesForInput = this.props.entries.filter(entry => entry.inputID === input.objectId);
        if (entriesForInput.length === 0) { return undefined }
        return entriesForInput[0];
    }

    render() {
        const isCalculateButtonActive = this.props.entries.filter(entry => {
                return entry.value !== null && entry.value !== undefined
            }).length > 0;

        return(
            <View style={styles.container}>
                <SectionList
                    style={{flex:1}}
                    renderItem={({item}) => <InputEntryListItem input={item} inputEntry={this.getEntryForInput(item)} onInputSelected={this.handleInputSelected} />}
                    renderSectionHeader={({section}) => <Text style={styles.list}>{section.title}</Text>}
                    sections={[
                        {data: this.state.recipe.inputs}
                    ]}
                    keyExtractor={item => (item as Input).objectId}
                    contentInsetAdjustmentBehavior={'always'}
                />
                <Button
                    styles={styles.button}
                    onPress={this.handleCalculatePressed}
                    title="Calculate"
                    disabled={!isCalculateButtonActive}
                />
            </View>
        );
    }
}

export const InputEntryListScreen = connect(mapStateToProps)(InputEntryListScreenComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#070D14',
    },
    list: {
        textAlign: 'left'
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: '#005C9E',
        height: 45,
        margin: 5
    },
    settingIcon: {
        color: 'white',
        fontSize: 22,
        margin: 15
    }
});
  