import React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SVG } from '~/assets/images';
import ModalHeader from '~/components/headers/ModalHeader';
import { useTheme } from '~/components/PDTheme';
import { EstimateRoute } from '~/navigator/PDVolumeNavigator';

import { useRoute } from '@react-navigation/native';

import { EstimateVolume } from './components/EstimateVolume';
import UnitButton from './components/UnitButton';
import { getElementByShapeId } from './shapes/ShapeUtils';
import styles from './shapes/VolumeEstimatorStyles';
import { VolumeEstimatorHelpers } from './VolumeEstimatorHelpers';

const EntryShapeScreen = () => {
    const { width, height } = useWindowDimensions();
    const { params } = useRoute<EstimateRoute>();
    const theme = useTheme();

    /// SVG Rendering
    const ShapeName = VolumeEstimatorHelpers.getBigShapeForSVG(params.shapeId);
    const ShapeSVG = SVG[ShapeName];

    // Colors
    const primaryBlurredColor = VolumeEstimatorHelpers.getPrimaryBlurredColorByShapeId(params.shapeId, theme);
    // Entry Shape
    const EntryShape = getElementByShapeId(params.shapeId);

    return (
        <View style={ styles.container }>
            <ModalHeader>Volume Estimator</ModalHeader>
            <KeyboardAwareScrollView style={ styles.content } >
                <View style={ StyleSheet.flatten([styles.shapeContainer, { backgroundColor: primaryBlurredColor }]) }>
                    <ShapeSVG width={ width } height={ height * 0.25 } />
                </View>
                <UnitButton />
                <EntryShape />
                <EstimateVolume />
            </KeyboardAwareScrollView>
        </View>
    );
};

export default EntryShapeScreen;
