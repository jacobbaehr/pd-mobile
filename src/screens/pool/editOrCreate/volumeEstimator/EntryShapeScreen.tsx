import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SVG } from '~/assets/images';
import { ScreenHeader } from '~/components/headers/ScreenHeader';
import { useTheme } from '~/components/PDTheme';
import { EstimateRoute } from '~/navigator/shared';
import { useTypedSelector } from '~/redux/AppState';

import { useRoute } from '@react-navigation/native';

import { EstimateVolume } from './components/EstimateVolume';
import UnitButton from './components/UnitButton';
import { getElementByShapeId, ShapesProps } from './shapes/ShapeUtils';
import styles from './shapes/VolumeEstimatorStyles';
import { VolumeEstimatorHelpers } from './VolumeEstimatorHelpers';

const EntryShapeScreen: React.FC = () => {
    const { params } = useRoute<EstimateRoute>();
    const theme = useTheme();
    const deviceSettings = useTypedSelector(state => state.deviceSettings);
    const [unit, setUnit] = useState(deviceSettings.units);

    /// SVG Rendering
    const ShapeName = VolumeEstimatorHelpers.getBigShapeForSVG(params.shapeId);
    const ShapeSVG = SVG[ShapeName];

    // Colors
    const primaryBlurredColor = VolumeEstimatorHelpers.getPrimaryBlurredColorByShapeId(params.shapeId, theme);
    // Entry Shape
    const EntryShape : React.FC<ShapesProps> = getElementByShapeId(params.shapeId);

    return (
        <View style={ styles.container }>
            <ScreenHeader textType="subHeading" hasBottomLine={ false }>Volume Estimator</ScreenHeader>
            <KeyboardAwareScrollView style={ styles.content } extraScrollHeight={ 80 } enableOnAndroid>
                <View style={ StyleSheet.flatten([styles.shapeContainer, { backgroundColor: primaryBlurredColor }]) }>
                    <ShapeSVG width={ '100%' } />
                </View>
                <UnitButton  unit={ unit } handleUnit={ setUnit } />
                <EntryShape unit={ unit } />
                <EstimateVolume unit={ unit } />
            </KeyboardAwareScrollView>
        </View>
    );
};

export default EntryShapeScreen;
