import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

interface DetailsScreenProps {
    navigation: NavigationScreenProp<{ params: { name: string }}, {}>
}

interface DetailsScreenState {
    name: string
}

export class DetailsScreen extends React.Component<DetailsScreenProps, {}> {

    constructor(props: DetailsScreenProps) {
        super(props);
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>
                    {this.props.navigation.state.params.name}
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
  