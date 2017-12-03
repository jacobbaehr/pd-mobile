import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export class DetailsScreen extends React.Component<{}, {}> {

    constructor(props: {}) {
        super(props);

        this.state = {
            enthusiasmLevel: 1
        };
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>
                    This is the details screen
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
  });
  