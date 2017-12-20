import * as React from 'react';
import { View, Text, StyleSheet, SectionList, TextInput } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Button } from '../components/Button'
import { dispatch } from '../Redux/AppState';
import { setReading } from '../Redux/Actions';
import { Pool } from '../Models/Pool';

interface PoolScreenProps {
    navigation: NavigationScreenProp<{ params: { pool: Pool }}, void>; 
}



export class PoolScreen extends React.Component<PoolScreenProps>{
    pool: Pool;
    private handleTextChanged = (text: string) => {
        this.setState({value: Number(text)});
    }

    private handleButtonPressed = () => {
        //**TODO** - setup dispatch to store pool size in redux
        // dispatch(setReading(this.reading.identifier, this.state.value));
        this.props.navigation.goBack();
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.readingNameLabel}>
                </Text>
                <TextInput style={styles.textInput} onChangeText={this.handleTextChanged} keyboardType={'numeric'}
                    autoFocus={true} />
                <Button title="Set Pool Size" onPress={this.handleButtonPressed} styles={styles.button}/>
            </View>
        );
    }
}
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'stretch',
          backgroundColor: '#F5FCFF'
        },
        readingNameLabel: {
            margin: 15,
            justifyContent: 'center'
        },
        textInput: {
            height: 40,
            borderWidth: 1,
            borderColor: 'black',
            margin: 15,
            textAlign: 'center'
        },
        button: {
            alignSelf: 'stretch',
            backgroundColor: 'purple',
            height: 45,
            margin: 15
        }
    });
