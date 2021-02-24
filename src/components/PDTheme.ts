import * as React from 'react';

/// For now, this is all colors, named after day-mode:
export interface PDTheme {
    white: string;
    black: string;
    grey: string;
    greyDarker: string;
    red: string;
    blurredRed: string;
}

/// Represents all the possible colors in the app. We'll probably change these names soon --
/// for instance, in night mode, 'white' will actually be black & vice-versa... so that's a bad name.
export type PDColor = 'white' | 'black' | 'grey' | 'greyDarker' | 'red' | 'blurredRed';

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
    grey: '#BBBBBB',
    red: '#F90000',
    blurredRed: '#F9000010',
    greyDarker: '#262626',
};

/// This is fake, don't use it yet:
export const darkTheme: PDTheme = {
    white: '#FFFFFF',
    black: '#000000',
    grey: '#BBBBBB',
    red: '#F90000',
    blurredRed: '#F9000010',
    greyDarker: '#262626',
};

export const PDThemeContext = React.createContext<PDTheme>(lightTheme);
export const useTheme = () => React.useContext(PDThemeContext);

// These are so darn convenient to keep here for reference when refactoring:
// const palette = {
//     pink: '#FF0073',
//     red: '#F90000',
//     orange: '#FF7502',
//     green: '#00B25C',
//     teal: '#00AEA0',
//     blue: '#1E6BFF',
//     purple: '#B21FF1',

//     white: '#ffffff',
//     lightWhite: '#FAFAFA',
//     black: '#000000',

//     greyLighter: '#F5F5F5',
//     greyLight: '#EDEDED',
//     grey: '#BBBBBB',
//     greyDark: '#8C8C8C',
//     greyDarker: '#262626',

//     blurredRed: '#F9000010',
// };
