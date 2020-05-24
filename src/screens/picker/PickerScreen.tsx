import * as React from 'react';
import { StyleSheet, SafeAreaView, View, SectionList } from 'react-native';

import { PDText } from '~/components/PDText';
import { StackNavigationProp } from '@react-navigation/stack';
import { PDNavStackParamList } from '~/navigator/Navigators';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { PickerItem } from './PickerItem';
import { PickerRow } from './PickerRow';
import { dispatch } from '~/redux/AppState';
import { updatePickerState } from '~/redux/picker/Actions';
import { PickerState, PickerKey } from '~/redux/picker/PickerState';

export interface PDPickerRouteProps {
    title: string,
    subtitle: string,
    items: PickerItem[],
    pickerKey: PickerKey;
    prevSelection?: string;
}

interface PickerScreenProps {
    navigation: StackNavigationProp<PDNavStackParamList, 'PickerScreen'>;
    route: RouteProp<PDNavStackParamList, 'PickerScreen'>;
}

export const PickerScreen: React.FunctionComponent<PickerScreenProps> = (props: PickerScreenProps) => {

    const { title, subtitle, items, pickerKey, prevSelection } = props.route.params;
    const { goBack } = useNavigation();

    const handleButtonPress = (value: string) => {
        const pickerState: PickerState = {
            key: pickerKey,
            value
        };
        dispatch(updatePickerState(pickerState));
        goBack();
    };

    return (
        <SafeAreaView style={ { flex: 1, backgroundColor: '#FFFFFF' } } >
            <View style={ styles.container }>
                <View style={ styles.header }>
                    <View style={ styles.headerLeft }>
                        <PDText style={ [styles.title, styles.titleTop] }>{ title }</PDText>
                        <PDText style={ [styles.title, styles.titleBottom] }>{ subtitle }</PDText>
                    </View>
                </View>
                <SectionList
                    style={ { flex: 1, paddingTop: 20 } }
                    renderItem={ ({ item }) => <PickerRow item={ item } onSelect={ handleButtonPress } isSelected={ prevSelection === item.value } /> }
                    sections={ [{ data: items }] }
                    keyExtractor={ item => item.value }
                    overScrollMode={ 'always' } />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
        marginTop: 24
    },
    header: {
        display: 'flex',
        flexDirection: 'row'
    },
    headerLeft: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    },
    title: {
        marginLeft: 12,
        fontSize: 28,
        fontWeight: 'bold'
    },
    titleBottom: {
        color: '#1E6BFF',
        marginBottom: 12
    },
    titleTop: {
        color: '#000',
        marginBottom: -3
    }
});