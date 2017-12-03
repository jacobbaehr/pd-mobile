import * as React from 'react';
import { View, Text, StyleSheet, Button, SectionList } from 'react-native';
import { Hello } from '../components/Hello';
import { NavigationScreenProp } from 'react-navigation';
import { SiteListItem } from './SiteListItem';


interface HomeScreenProps {
    navigation: NavigationScreenProp<{}, {}>
}

interface HomeScreenState {
    sites: String[]
}

export class HomeScreen extends React.Component<HomeScreenProps, HomeScreenState> {

    constructor(props: HomeScreenProps) {
        super(props);

        this.state = {
            sites: ['Site 1',
                'Site 2',
                'Wawa',
                'Buckeyes']
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
                    renderItem={({item}) => <SiteListItem name={item} onSiteSelected={this.handleSiteSelected} />}
                    renderSectionHeader={({section}) => <Text>{section.title}</Text>}
                    sections={[
                        {data: this.state.sites, title: 'Section 1'}
                    ]}
                />
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
  