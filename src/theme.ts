import { createTheme } from '@shopify/restyle';

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
};

const theme = createTheme({
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
    breakpoints: {
        phone: 0,
        tablet: 768,
    },
    textVariants: {
        tooltip: {
            fontFamily: 'Poppins-Medium',
            fontStyle: 'normal',
            lineHeight: 21,
            fontSize: 14,
        },
        Button: {
            fontFamily: 'Poppins-Bold',
            fontStyle: 'normal',
            lineHeight: 21,
            fontSize: 14,
        },
        bodyRegular: {
            fontFamily: 'Poppins-Regular',
            fontStyle: 'normal',
            lineHeight: 24,
            fontSize: 16,
        },
        bodyBold: {
            fontFamily: 'Poppins-Bold',
            fontStyle: 'normal',
            lineHeight: 24,
            fontSize: 16,
        },
        bodySemiBold: {
            fontFamily: 'Poppins-SemiBold',
            fontStyle: 'normal',
            lineHeight: 24,
            fontSize: 16,
        },
        bodyMedium: {
            fontFamily: 'Poppins-Medium',
            fontStyle: 'normal',
            lineHeight: 24,
            fontSize: 16,
        },
        bodyGreyBold: {
            fontFamily: 'Poppins-Bold',
            fontStyle: 'normal',
            lineHeight: 21,
            fontSize: 14,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
        },
        subHeading: {
            fontFamily: 'Poppins-Bold',
            fontStyle: 'normal',
            lineHeight: 27,
            fontSize: 18,
        },
        heading: {
            fontFamily: 'Poppins-Regular',
            fontWeight: 'bold',
            fontStyle: 'normal',
            lineHeight: 36,
            fontSize: 24,
        },
    },
    cardVariants: {
        border: {
            backgroundColor: palette.white,
            borderWidth: 2,
            borderColor: palette.greyLight,
            borderRadius: 24,
            padding: 24,
            marginHorizontal: 18,
        },
        blueBackground: {
            backgroundColor: palette.blue,
            opacity: 0.03,
            padding: 24,
            borderRadius: 18,
            marginHorizontal: 18,
        },
        purpleBackground: {
            backgroundColor: palette.purple,
            opacity: 0.03,
            padding: 24,
            borderRadius: 18,
            marginHorizontal: 18,
        },
        redBackground: {
            backgroundColor: palette.red,
            opacity: 0.03,
            padding: 24,
            borderRadius: 18,
            marginHorizontal: 18,
        },
        tealBackground: {
            backgroundColor: palette.teal,
            opacity: 0.03,
            padding: 24,
            borderRadius: 18,
            marginHorizontal: 18,
        },
        greenBackground: {
            backgroundColor: palette.green,
            opacity: 0.03,
            padding: 24,
            borderRadius: 18,
            marginHorizontal: 18,
        },
        pinkBackground: {
            backgroundColor: palette.pink,
            opacity: 0.03,
            padding: 24,
            borderRadius: 18,
            marginHorizontal: 18,
        },
    },
});

export type Theme = typeof theme;
export default theme;
