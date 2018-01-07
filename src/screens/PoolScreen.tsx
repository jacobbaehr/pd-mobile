import * as React from 'react';
import { View, Text, StyleSheet, SectionList, TextInput } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Button } from '../components/Button'
import { dispatch } from '../Redux/AppState';
import { saveNewPool } from '../Redux/Actions';
import { Pool } from '../Models/Pool';

interface PoolScreenProps {
    navigation: NavigationScreenProp<{ params: { pool: Pool }}, void>;
}

interface PoolScreenState { 
    volume: number;

    name: string;
}

export class PoolScreen extends React.Component<PoolScreenProps, PoolScreenState> {

    constructor(props: PoolScreenProps) {
        super(props);

        this.state = {
            volume: 0,
            name: ''
        };
    }

    /// Whenever user types, update our state with the new value for volume
    private handleVolumeTextChanged = (text: string) => {
        this.setState({volume: Number(text)});
    }

    /// Whenever user types, update our state with the new value for volume
    private handleNameTextChanged = (text: string) => {
        this.setState({name: text});
    }

    /// Whenever user presses "save", save a new pool with the specified volume.
    private handleButtonPressed = () => {
        // Get the volume from our state
        const volume = this.state.volume;
        const name = this.state.name;

        console.log('VOLUME: ');
        console.log(volume);
        // Create a new pool with that volume
        const pool = Pool.make(name, volume);

        // Save that pool
        dispatch(saveNewPool(pool));
        
        // On success, navigate back to previous screen.
        this.props.navigation.goBack();
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.poolNameLabel}>Pool Name</Text>
                <TextInput style={styles.textInput} onChangeText={this.handleNameTextChanged} keyboardType={'default'}
                    autoFocus={true}/>
                <Text style={styles.poolNameLabel}>Pool Volume</Text>
                <TextInput style={styles.textInput} onChangeText={this.handleVolumeTextChanged} keyboardType={'numeric'}
                    autoFocus={true} />
                
                <Button title="Save Pool" onPress={this.handleButtonPressed} styles={styles.button}/>
            </View>
        );
    }
}
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          backgroundColor: '#070D14', 
        },
        poolNameLabel: {
            margin: 15,
            justifyContent: 'center',
            color: '#ffffff'
        },
        textInput: {
            height: 40,
            borderWidth: 1,
            borderColor: '#ffffff',
            borderRadius: 5,
            color: '#ffffff',
            margin: 15,
            textAlign: 'center'
        },
        button: {
            alignSelf: 'stretch',
            backgroundColor: '#005C9E',
            height: 45,
            margin: 15
        }
    });
