import * as React from 'react';
import { View, Text, StyleSheet, Button, SectionList } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';

import { Hello } from '../components/Hello';
import { SiteListItem } from './SiteListItem';
import { AppState, Reading } from '../Redux/Reducers';

interface HomeScreenProps {
    navigation: NavigationScreenProp<{}, {}>;
    readings: Reading[];
}

interface HomeScreenState {
    sites: String[]
}

const mapStateToProps = (state: AppState, ownProps: HomeScreenProps): HomeScreenProps => {
    return {
        navigation: ownProps.navigation,
        readings: state.readings
    };
};

class HomeScreenComponent extends React.Component<HomeScreenProps, HomeScreenState> {
    constructor(props: HomeScreenProps) {
        super(props);

        this.state = {
            sites: ['Chlorine',
                'pH',
                'Total Alkalinity']
        };
    }

    handleSiteSelected = (name: string): void => {
        console.log('name: ' + name);
        this.props.navigation.navigate('Details', { name });
    }

    render() {
        return(
            <View style={styles.container}>
                <SectionList
                    style={{flex: 1}}
                    renderItem={({item}) => <SiteListItem name={item} onSiteSelected={this.handleSiteSelected} key={item} />}
                    renderSectionHeader={({section}) => <Text>{section.title}</Text>}
                    sections={[
                        {data: this.state.sites, title: 'Readings'}
                    ]}
                />
            </View>
        );
    }
}

export const HomeScreen = connect(mapStateToProps)(HomeScreenComponent);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
  });
  