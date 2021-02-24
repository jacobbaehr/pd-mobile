import * as React from 'react';

/// For now, this is all colors, named after day-mode:
export interface PDTheme {
    white: string;
    black: string;
}

export const lightTheme: PDTheme = {
    white: '#FFFFFF',
    black: '#000000',
};

/// This is fake, don't use it yet:
export const darkTheme: PDTheme = {
    white: '#FFFFFF',
    black: '#000000',
};

const PDThemeContext = React.createContext<PDTheme>(lightTheme);
export const useTheme = () => React.useContext(PDThemeContext);

const palette = {
    pink: '#FF0073',
    red: '#F90000',
    orange: '#FF7502',
    green: '#00B25C',
    teal: '#00AEA0',
    blue: '#1E6BFF',
    purple: '#B21FF1',

    white: '#ffffff',
    lightWhite: '#FAFAFA',
    black: '#000000',

    greyLighter: '#F5F5F5',
    greyLight: '#EDEDED',
    grey: '#BBBBBB',
    greyDark: '#8C8C8C',
    greyDarker: '#262626',

    blurredRed: '#F9000010',
};

const theme = {
    colors: {
        ...palette,
        whiteBackground: palette.white,
        blueBackground: palette.white,
        purpleBackground: palette.white,
        redBackground: palette.white,
        orangeBackground: palette.white,
        tealBackground: palette.white,
        pinkBackground: palette.white,
    },
    spacing: {
        xs: 8,
        sm: 12,
        md: 16,
        lg: 24,
        xl: 40,
    },
    cardVariants: {
        default: {
            borderRadius: 8,
            paddingVertical: 'xs',
            paddingHorizontal: 'sm',
            justifyContent: 'center',
            alignItems: 'center',
        },
    },
};

export type Theme = typeof theme;
export default theme;
