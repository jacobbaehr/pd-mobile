import React from 'react';
import { SvgProps } from 'react-native-svg';
import { PDColor } from '~/components/PDTheme';

// General Icons
import IconBack from './images/icons/icon_back.svg';
import IconForward from './images/icons/icon_forward.svg';
// Volumen Estimator
import IconCircle from './images/shapes/icon_circle.svg';
import IconOther from './images/shapes/icon_other.svg';
import IconOval from './images/shapes/icon_oval.svg';
import IconRectangle from './images/shapes/icon_rectangle.svg';

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
    coolDog: require('~/assets/images/dog_in_hat.png'),
    nameIcon: require('~/assets/images/icon-name.png'),
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

interface OverrideSvgProps extends SvgProps {
    fill: string | PDColor;
}

export const SVG = {
    IconCircle: (props: OverrideSvgProps): JSX.Element => <IconCircle {...props} />,
    IconRectangle: (props: OverrideSvgProps): JSX.Element => <IconRectangle {...props} />,
    IconOval: (props: OverrideSvgProps): JSX.Element => <IconOval {...props} />,
    IconOther: (props: OverrideSvgProps): JSX.Element => <IconOther {...props} />,
    IconCircleBack: (props: OverrideSvgProps): JSX.Element => <IconBack {...props} />,
    IconForward: (props: OverrideSvgProps): JSX.Element => <IconForward {...props} />,
};
