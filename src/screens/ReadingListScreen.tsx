import * as React from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Button } from '../components/Button';
import { ReadingListItem } from './ReadingListItem';
import { AppState } from '../Redux/AppState';
import { Reading } from '../Models/Reading';

interface ReadingListScreenProps {
    navigation: NavigationScreenProp<{}, {}>;
    readings: Reading[];
}

const mapStateToProps = (state: AppState, ownProps: ReadingListScreenProps): ReadingListScreenProps => {
    return {
        navigation: ownProps.navigation,
        readings: state.readings
    };
};

class ReadingListComponent extends React.Component<ReadingListScreenProps, {}> {

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

    handleSiteSelected = (reading: Reading): void => {
        this.props.navigation.navigate('Details', { reading });
    }

    handleCalculatePressed = (): void => {
        this.props.navigation.navigate('Results');
    }
    
    handlePoolSelectPressed = (): void => {
        this.props.navigation.navigate('Pool');
    }

    render() {
        const isCalculateButtonActive = this.props.readings.filter(reading => {
                return reading.value !== null && reading.value !== undefined
            }).length > 0;

        return(
            <View style={styles.container}>
                <SectionList
                    style={{flex:1}}
                    renderItem={({item}) => <ReadingListItem reading={item} onSiteSelected={this.handleSiteSelected} />}
                    renderSectionHeader={({section}) => <Text style={styles.list}>{section.title}</Text>}
                    sections={[
                        {data: this.props.readings}
                    ]}
                    keyExtractor={item => (item as Reading).identifier}
                />
                <Button
                    styles={styles.button}
                    onPress={this.handlePoolSelectPressed}
                    title="Pool Size"
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

export const ReadingListScreen = connect(mapStateToProps)(ReadingListComponent);

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
  