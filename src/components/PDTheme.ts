import * as React from 'react';

/// For now, this is all colors, named after day-mode:
export interface PDTheme {
    white: string;
    black: string;
    grey: string;
    greyDarker: string;
    greyLight: string;
    greyVeryLight: string,
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
/// Represents all the possible colors in the app. We'll probably change these names soon --
/// for instance, in night mode, 'white' will actually be black & vice-versa... so that's a bad name.
export type PDColor = keyof PDTheme;
/// Defines some constants for margins / padding / etc...
export const PDSpacing = {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 40,
};
export const lightTheme: PDTheme = {
    white: '#FFFFFF',
    black: '#000000',
    grey: '#737373',
    greyDarker: '#262626',
    greyLight: '#EDEDED',
    greyVeryLight: '#FAFAFA',
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
/// This is fake, don't use it yet:
export const darkTheme: PDTheme = {
    white: '#FFFFFF',
    black: '#000000',
    grey: '#BBBBBB',
    greyDarker: '#262626',
    greyLight: '#EDEDED',
    greyVeryLight: '#FAFAFA',
    blurredRed: '#F9000010',
    blurredBlue: '#1E6BFF10',
    blurredOrange: '#FF750210',
    blurredPurple: '#B21FF110',
    blurredTeal: '#00AEA010',
    blurredPink: '#FF007310',
    blurredGreen: '#00B25C10',
    pink: '#FF0073',
    red: '#F90000',
    orange: '#FF7502',
    green: '#00B25C',
    teal: '#00AEA0',
    blue: '#1E6BFF',
    purple: '#B21FF1',
};
export const PDThemeContext = React.createContext<PDTheme>(lightTheme);
export const useTheme = () => React.useContext(PDThemeContext);
