import React from 'react';
import { StyleSheet, View } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { SVG } from '~/assets/images';

import { PDText } from '../PDText';
import { PDSpacing } from '../PDTheme';

const ModalHeader: React.FC = (props) => {
    const { children } = props;

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <TouchableScale>
                    <SVG.IconCircleBack fill={'black'} />
                </TouchableScale>
            </View>
            <View style={styles.centerContainer}>
                <PDText type="subHeading">{children}</PDText>
            </View>
            <View style={styles.rightContainer} />
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
    leftContainer: {},
    rightContainer: {},
    centerContainer: {},
});
