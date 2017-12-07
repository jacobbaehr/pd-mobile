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

const mapStateToProps = (state: AppState, ownProps: HomeScreenProps): HomeScreenProps => {
    return {
        navigation: ownProps.navigation,
        readings: state.readings
    };
};

class HomeScreenComponent extends React.Component<HomeScreenProps, {}> {

    handleSiteSelected = (reading: Reading): void => {
        this.props.navigation.navigate('Details', { reading });
    }

    render() {
        return(
            <View style={styles.container}>
                <SectionList
                    style={{flex: 1}}
                    renderItem={({item}) => <SiteListItem reading={item} onSiteSelected={this.handleSiteSelected} key={item.identifier} />}
                    renderSectionHeader={({section}) => <Text>{section.title}</Text>}
                    sections={[
                        {data: this.props.readings, title: 'Readings'}
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
  