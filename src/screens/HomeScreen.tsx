import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Hello } from '../components/Hello';
import { NavigationAction } from 'react-navigation';


interface HomeScreenProps {
    navigation: any
}

interface HomeScreenState {
    enthusiasmLevel: number
}

export class HomeScreen extends React.Component<HomeScreenProps, HomeScreenState> {

    constructor(props: HomeScreenProps) {
        super(props);

        this.state = {
            enthusiasmLevel: 1
        };
    }

    handleButtonPress = (): void => {
        this.props.navigation.navigate('Details');
    }

    render() {
        console.log('AAAAAAAA&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
        return(
            <View style={styles.container}>
                <Hello
                    personName={ 'wade' }
                    enthusiasmLevel={ this.state.enthusiasmLevel }/>
                    <Button title={'Show Me More'} onPress={this.handleButtonPress} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
  });
  