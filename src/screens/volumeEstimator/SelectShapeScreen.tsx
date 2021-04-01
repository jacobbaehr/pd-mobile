import React from 'react';
import { ListRenderItem, StyleSheet, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { SVG } from '~/assets/images';
import ModalHeader from '~/components/headers/ModalHeader';
import { PDText } from '~/components/PDText';
import { PDSpacing } from '~/components/PDTheme';
import { PDStackNavigationProps } from '~/navigator/shared';

import { useNavigation } from '@react-navigation/core';

import { Shape, ShapeId, shapes } from './VolumeEstimatorHelpers';

const SelectShapeScreen = () => {
    const navigation = useNavigation<PDStackNavigationProps>();

    const handlePressedShape = (shapeId: ShapeId) => {
        navigation.push('EntryShape', { shapeId });
    };

    const renderItem: ListRenderItem<Shape> = ({ item }) => {
        const Icon = SVG[item.icon];
        return (
            <TouchableOpacity style={ styles.itemContainer } onPress={ () => handlePressedShape(item.id) }>
                <View style={ styles.itemInnerContainer }>
                    <Icon width={ 32 } height={ 32 } />
                    <View style={ styles.itemTextContainer }>
                        <PDText type={ 'default' } style={ styles.itemLabelText }>
                            {item.label}
                        </PDText>
                    </View>
                </View>
                <SVG.IconForward fill="#BBBBBB" width={ 18 } height={ 18 } />
            </TouchableOpacity>
        );
    };

    const HeaderList = () => {
        return (
            <PDText type="bodyBold" style={ styles.headerText }>
                Choose pool Shape
            </PDText>
        );
    };

    return (
        <View style={ styles.container }>
            <ModalHeader>Volume Estimator</ModalHeader>
            <View style={ styles.content }>
                <View>
                    <PDText type="bodyRegular" color="greyDarker" style={ styles.description } numberOfLines={ 2 }>
                        Don’t know your pool’s volume? Tap “Use Volume Estimator” below.
                    </PDText>
                </View>
                <FlatList
                    data={ shapes }
                    renderItem={ renderItem }
                    keyExtractor={ (item) => item.id }
                    ListHeaderComponent={ HeaderList }
                    ListHeaderComponentStyle={ styles.headerContainer }
                />
            </View>
        </View>
    );
};

export default SelectShapeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    content: {
        paddingHorizontal: PDSpacing.lg,
    },
    headerText: {
        textTransform: 'uppercase',
        textAlign: 'left',
        color: '#737373',
        lineHeight: 21,
        letterSpacing: 0.5,
    },
    headerContainer: {
        marginTop: PDSpacing.sm,
        marginBottom: PDSpacing.sm,
    },
    description: {
        color: '#737373',
        textAlign: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        borderRadius: 14,
        marginBottom: PDSpacing.sm,
        padding: PDSpacing.sm,
    },
    itemLabelText: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'Poppins-SemiBold',
        lineHeight: 24,
        textAlign: 'left',
        textAlignVertical: 'center',
    },
    itemInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemTextContainer: {
        marginLeft: PDSpacing.sm,
    },
});
