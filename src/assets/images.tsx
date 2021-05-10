import React from 'react';
import { SvgProps } from 'react-native-svg';
import { PDColor } from '~/components/PDTheme';

import IconCircleAdd from './images/icons/icon_circle_add.svg';
// General Icons
import IconBack from './images/icons/icon_circle_back.svg';
import IconCircleEdit from './images/icons/icon_circle_edit.svg';
import IconCircleForward from './images/icons/icon_circle_forward.svg';
import IconForward from './images/icons/icon_forward.svg';
import IconInformation from './images/icons/icon_information.svg';
import Circle from './images/shapes/big_circle.svg';
import Other from './images/shapes/big_other.svg';
import Oval from './images/shapes/big_oval.svg';
import Rectangle from './images/shapes/big_rectangle.svg';
import IconCloseButton from './images/shapes/close_button.svg';
import IconCheckmark from './images/shapes/icon_checkmark.svg';
// Volume Estimator
import IconCircle from './images/shapes/icon_circle.svg';
import IconDelete from './images/shapes/icon_delete.svg';
import IconEstimator from './images/shapes/icon_estimator.svg';
// Create and Edit Pool
import IconName from './images/shapes/icon_name.svg';
import IconOther from './images/shapes/icon_other.svg';
import IconOval from './images/shapes/icon_oval.svg';
import IconRecipes from './images/shapes/icon_recipes.svg';
import IconRectangle from './images/shapes/icon_rectangle.svg';
import IconVolume from './images/shapes/icon_volume.svg';
import IconWallType from './images/shapes/icon_walltype.svg';
import IconWaterType from './images/shapes/icon_watertype.svg';

/** */
export const images = {
    back: require('./images/back.png'),
    backBlue: require('./images/back_blue.png'),
    closeBlue: require('./images/close_blue.png'),
    backReadingsBlue: require('./images/back_readings_blue.png'),
    backTreatmentsPurple: require('./images/back_treatments_purple.png'),
    backRecipesGreen: require('./images/back_recipes_green.png'),
    backTrans: require('./images/back_trans.png'),
    closeDark: require('./images/close_dark.png'),
    history: require('./images/history.png'),
    poolListEmpty: require('./images/pd_bg_2.png'),
    star: require('./images/star.png'),
    waterType: require('./images/water_type.png'),
    greenAuthenticationBackground: require('./images/green_authentication_background.png'),
    blueAuthenticationBackground: require('./images/blue_authentication_background.png'),
    backWhite: require('./images/back_white.png'),
    closeIcon: require('./images/close_icon.png'),
    plusButton: require('./images/plus.png'),
    gearButton: require('./images/gear.png'),
    gearLightButton: require('./images/gear_light.png'),
    logoGreenPlus: require('./images/logo_plus_green.png'),
    logoGreenPlusWhite: require('./images/money_logo.png'),
    rightArrow: require('./images/right_arrow.png'),
    sliderThumb: require('./images/thumb.png'),
    sliderThumbSmall: require('./images/thumb_small.png'),
    sliderThumbBlue: require('./images/thumb_blue.png'),
    greenCheck: require('./images/green_check.png'),
    incomplete: require('./images/incomplete.png'),
    trends: require('./images/trends.png'),
    pools3: require('./images/pools_3.png'),
    titleIcon: require('~/assets/images/icon-name.png'),
    waterTypeIcon: require('~/assets/images/icon-water-type.png'),
    volumeIcon: require('~/assets/images/icon-volume.png'),
    wallTypeIcon: require('~/assets/images/icon-wall-type.png'),
    recipeIcon: require('~/assets/images/icon-recipe.png'),
    targetsIcon: require('~/assets/images/icon-targets.png'),
    exportIcon: require('~/assets/images/icon-export.png'),
    importIcon: require('~/assets/images/icon-import.png'),
    deleteIcon: require('~/assets/images/icon-delete.png'),
    menuChevronIcon: require('~/assets/images/icon-menu-chevron.png'),
};

export interface OverrideSvgProps extends SvgProps {
    fill?: string | PDColor;
}

export const SVG:  Record<string, (props: OverrideSvgProps) => JSX.Element> = {
        IconCircle: (props) => <IconCircle { ...props } />,
        IconRectangle: (props) => <IconRectangle { ...props } />,
        IconOval: (props) => <IconOval { ...props } />,
        IconOther: (props) => <IconOther { ...props } />,
        IconCircleBack: (props) => <IconBack { ...props } />,
        IconCircleEdit: (props) => <IconCircleEdit { ...props } />,
        IconForward: (props) => <IconForward { ...props } />,
        Rectangle: (props) => <Rectangle { ...props } />,
        Oval: (props) => <Oval { ...props } />,
        Circle: (props) => <Circle { ...props } />,
        Other: (props) => <Other { ...props } />,
        IconEstimator: (props) => <IconEstimator { ...props } />,
        IconCheckmark: (props) => <IconCheckmark { ...props } />,
        IconDelete: (props) => <IconDelete { ...props } />,
        IconCircleAdd: (props) => <IconCircleAdd { ...props } />,
        IconCircleForward: (props) => <IconCircleForward { ...props } />,
        IconInformation: (props) => <IconInformation { ...props } />,
        IconCloseButton: (props)=> <IconCloseButton { ...props } />,
        IconName: (props)=> <IconName { ...props } />,
        IconWaterType: (props)=> <IconWaterType { ...props } />,
        IconVolume: (props)=> <IconVolume { ...props } />,
        IconWallType: (props)=> <IconWallType { ...props } />,
        IconRecipes: (props)=> <IconRecipes { ...props } />,
};
