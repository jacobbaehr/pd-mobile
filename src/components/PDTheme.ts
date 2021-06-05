import * as React from 'react';
import { StatusBarStyle } from 'react-native';

// --------------------------------------------------------------
// ---------------------- Theme Types  --------------------------
// --------------------------------------------------------------


export interface PDMainColors {
    // Blurred Colors
    blurredRed: string;
    blurredBlue: string;
    blurredOrange: string;
    blurredPurple: string;
    blurredTeal: string;
    blurredPink: string;
    blurredGreen: string;

    // Main Colors
    pink: string;
    red: string;
    orange: string;
    green: string;
    teal: string;
    blue: string;
    purple: string;
}

export interface PDThemeColors {
    background: string
    card: string
    border: string
}

/// For now, this is all colors, named after day-mode:
export interface PDTheme extends PDMainColors, PDThemeColors {
    darkMode: boolean;
    white: string;
    greyLighter: string
    greyLight: string;
    grey: string;
    greyDark: string
    greyDarker: string;
    black: string;

    // Status bar
    statusBarDefault: StatusBarStyle;
    statusBarContrast: StatusBarStyle;

    transparent: string
}

/// Represents all the possible colors in the app. We'll probably change these names soon --
/// for instance, in night mode, 'white' will actually be black & vice-versa... so that's a bad name.
export type PDColor = keyof PDTheme;
export type PDTextType =
    | 'default'
    | 'tooltip'
    | 'button'
    | 'bodyRegular'
    | 'bodyBold'
    | 'bodySemiBold'
    | 'bodyMedium'
    | 'bodyGreyBold'
    | 'subHeading'
    | 'heading'
    | 'buttonSmall';

/// Defines some constants for margins / padding / etc...
export const PDSpacing = {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 40,
};

export const MainColors: PDMainColors = {
    blurredRed: '#F9000007',
    blurredBlue: '#1E6BFF07',
    blurredOrange: '#FF750207',
    blurredPurple: '#B21FF107',
    blurredTeal: '#00AEA007',
    blurredPink: '#FF007307',
    blurredGreen: '#00B25C07',
    pink: '#FF0073',
    red: '#F90000',
    orange: '#FF7502',
    green: '#00B25C',
    teal: '#00AEA0',
    blue: '#1E6BFF',
    purple: '#B21FF1',
};


// TODO: Complete Colors Pallets
export const lightTheme: PDTheme = {
    darkMode: false,
    white: '#FFFFFF',
    greyLighter: '#F7F7F7',
    greyLight: '#EDEDED',
    grey: '#BBBBBB',
    greyDark: '#737373',
    greyDarker: '#262626',
    black: '#000000',

    background: '#FAFAFA',
    card: '#FFFFFF',
    border: '#EDEDED',

    transparent: 'transparent',
    statusBarDefault: 'dark-content',
    statusBarContrast: 'light-content',
    ...MainColors,

};

export const darkTheme: PDTheme = {
    darkMode: true,
    white: '#000000' ,
    greyLighter: '#080808',
    greyLight: '#1F1F1F',
    grey: '#454545',
    greyDark: '#949494',
    greyDarker: '#E6E6E6',
    black: '#FFFFFF',

    background: '#0D0D0D',
    card: '#000000',
    border: '#1F1F1F',

    transparent: 'transparent',
    statusBarDefault: 'dark-content',
    statusBarContrast: 'light-content',
    ...MainColors,
};

export const PDThemeContext = React.createContext<PDTheme>(darkTheme);
export const useTheme = () => React.useContext(PDThemeContext);

