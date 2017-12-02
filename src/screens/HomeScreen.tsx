import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Hello } from '../components/Hello';


interface HomeScreenState {
    enthusiasmLevel: number
}

export class HomeScreen extends React.Component<{}, HomeScreenState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            enthusiasmLevel: 1
        };
    }

    render() {
        console.log('AAAAAAAA&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
        return(
            <View style={styles.container}>
                <Hello
                    personName={ 'wade' }
                    enthusiasmLevel={ this.state.enthusiasmLevel }/>
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
  