import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { BackButton } from '~/components/buttons/BackButton';
import { useNavigation } from '@react-navigation/native';

const CustomTargetsHeader: React.FC = () => {
    const { goBack } = useNavigation();

    const handlePressedBack = () => {
        goBack();
    };
    return (
        <View style={styles.container}>
            <BackButton title="House Pool" onPress={handlePressedBack} scale={{ scale: true, scaleLines: 2 }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 18,
        backgroundColor: '#fff',
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 2,
        paddingBottom: 12,
    },
});

export default CustomTargetsHeader;
