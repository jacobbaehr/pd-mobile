import * as React from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';

import { Button } from '../components/Button';
import { SiteListItem } from './SiteListItem';
import { AppState } from '../Redux/Reducers';
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

    handleSiteSelected = (reading: Reading): void => {
        this.props.navigation.navigate('Details', { reading });
    }

    handleCalculatePressed = (): void => {
        this.props.navigation.navigate('Results');
    }

    handleSettingsPressed = (): void => {
        this.props.navigation.navigate('Settings');
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
                    style={{flex: 1}}
                    renderItem={({item}) => <SiteListItem reading={item} onSiteSelected={this.handleSiteSelected} />}
                    renderSectionHeader={({section}) => <Text>{section.title}</Text>}
                    sections={[
                        {data: this.props.readings, title: 'Readings'}
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
                <Button
                    styles={styles.button}
                    onPress={this.handleSettingsPressed}
                    title="Edit Chlorine Formula"
                />
            </View>
        );
    }
}

export const ReadingListScreen = connect(mapStateToProps)(ReadingListComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: 'blue',
        height: 45,
        margin: 15
    }
});
  