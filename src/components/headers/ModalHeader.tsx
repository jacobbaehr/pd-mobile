import React from 'react';
import { StyleSheet, View } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { SVG } from '~/assets/images';
import { PDStackNavigationProps } from '~/navigator/shared';

import { useNavigation } from '@react-navigation/core';

import { PDText } from '../PDText';
import { PDSpacing } from '../PDTheme';

const ModalHeader: React.FC = (props) => {
    const { children } = props;
    const navigation = useNavigation<PDStackNavigationProps>();

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TouchableScale onPress={goBack}>
                <SVG.IconCircleBack fill={'black'} />
            </TouchableScale>
            <PDText type="subHeading">{children}</PDText>
            <View />
        </View>
    );
};

export default ModalHeader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxHeight: 80,
        marginHorizontal: PDSpacing.lg,
    },
});
