import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { dispatch } from '../Redux/AppState';
import { setReading } from '../Redux/Actions';
import { Reading } from '../Redux/Reducers';

interface DetailsScreenProps {
    navigation: NavigationScreenProp<{ params: { reading: Reading }}, {}>
}

interface DetailsScreenState {
    name: string
}

export class DetailsScreen extends React.Component<DetailsScreenProps, {}> {

    constructor(props: DetailsScreenProps) {
        super(props);
    }

    private handleButtonPress = () => {
        dispatch(setReading(this.props.navigation.state.params.reading.identifier, 4));
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>
                    {this.props.navigation.state.params.reading.name}
                </Text>
                <Button title={'Set Reading'} onPress={ this.handleButtonPress }/>
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
  