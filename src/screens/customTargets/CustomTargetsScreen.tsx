import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';
import { PDText } from '~/components/PDText';
import CustomTargetsHeader from './CustomTargetsHeader';
import CustomTargetsItem from './CustomTargetsItem';

const CustomTargetsScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <CustomTargetsHeader />
            <FlatList
                data={[
                    { id: 0, value: '21' },
                    { id: 1, value: '' },
                    { id: 2, value: '12' },
                ]}
                renderItem={({ item }) => <CustomTargetsItem {...item} />}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={() => <PDText style={styles.title}>Customize Targets</PDText>}
                contentContainerStyle={styles.container}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        padding: 18,
    },
    title: {
        fontSize: 18,
        lineHeight: 27,
        fontStyle: 'normal',
        fontWeight: 'bold',
        color: '#323232',
        marginBottom: 12,
    },
});

export default CustomTargetsScreen;
