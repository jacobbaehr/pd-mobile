import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export class HomeScreen extends React.Component<{}, {}> {
    render() {
        console.log('AAAAAAAA&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
        return(
            <View style={styles.container}>
                <Text style={styles.welcome}>
                Let's track some tanks!!!!!!
                </Text>
                <Text style={styles.instructions}>
                To get started, quit.
                </Text>
                <Text style={styles.instructions}>
                Press Cmd+R to reload,{'\n'}
                Cmd+D or shake for dev menu
                </Text>
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
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });