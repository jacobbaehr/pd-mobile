import * as React from 'react';
import { BackButton } from '~/components/buttons/BackButton';
import { PDView } from '~/components/PDView';
import { PDText } from '~/components/PDText';

import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { PDSpacing } from '~/components/PDTheme';

const CustomTargetsHeader: React.FC = () => {
    const { goBack } = useNavigation();

    const handlePressedBack = () => {
        goBack();
    };

    return (
        <PDView style={styles.container} bgColor="white">
            <BackButton title="" onPress={handlePressedBack} scale={{ scale: true, scaleLines: 2 }} />
            <PDView style={styles.titleContainer}>
                <PDText type="heading" color="black" style={styles.text}>
                    Custom Targets
                </PDText>
            </PDView>
            <PDView />
        </PDView>
    );
};

export default CustomTargetsHeader;

// Yuck
const estimatedUpperBoundBackButtonTotalWidth = 65;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: PDSpacing.md,
        paddingVertical: PDSpacing.sm,
        borderBottomColor: '#F5F5F5',
        borderBottomWidth: 2,
    },
    titleContainer: {
        position: 'absolute',
        top: PDSpacing.md,
        left: estimatedUpperBoundBackButtonTotalWidth,
        right: estimatedUpperBoundBackButtonTotalWidth,
    },
    text: {
        textAlign: 'center',
    },
});
