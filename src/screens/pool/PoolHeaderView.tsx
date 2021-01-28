import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '~/components/buttons/Button';

import { Pool } from '~/models/Pool';

import { BackButton } from '~/components/buttons/BackButton';
import { useNavigation } from '@react-navigation/native';

interface PoolHeaderViewExternalProps {
    pool: Pool | null;
}

export const PoolHeaderView: React.FC<PoolHeaderViewExternalProps> = (props) => {
    const { pool } = props;
    const { navigate, goBack } = useNavigation();

    const handlePressedEdit = () => {
        navigate('EditPool');
    };
    const handlePressedBack = () => {
        goBack();
    };

    if (!pool) {
        return <></>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.navRow}>
                <View style={styles.backButtonContainer}>
                    <BackButton title={pool.name} onPress={handlePressedBack} scale={{ scale: true, scaleLines: 2 }} />
                </View>
                <View style={styles.editButtonContainer}>
                    <Button
                        title="Edit"
                        onPress={handlePressedEdit}
                        styles={styles.editButton}
                        textStyles={styles.editButtonText}
                        hitSlop={12}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'column',
        paddingHorizontal: 18,
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 2,
    },
    navRow: {
        flexDirection: 'row',
    },
    editButtonContainer: {
        alignSelf: 'center',
    },
    backButtonContainer: {
        flexGrow: 1,
    },
    editButton: {
        backgroundColor: 'rgba(30,107,255,.1)',
        borderRadius: 15,
    },
    editButtonText: {
        color: '#2D5FFF',
        textAlign: 'center',
        marginTop: '2%',
        fontFamily: 'Avenir Next',
        fontSize: 16,
        fontWeight: '700',
        paddingHorizontal: 15,
        paddingVertical: 3,
    },
});
