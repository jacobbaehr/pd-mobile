import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TouchableScale from 'react-native-touchable-scale';
import { images, SVG } from '~/assets/images';
import { TextButton } from '~/components/buttons/TextButton';
import ModalHeader from '~/components/headers/ModalHeader';
import { PDSafeAreaView } from '~/components/PDSafeAreaView';
import { PDText } from '~/components/PDText';
import { PDSpacing, useTheme } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';

const themeOptions = [
    {
        key: 'automatic',
        value: 'Automatic',
    },
    {
        key: 'dark',
        value: 'Dark',
    },
    {
        key: 'light',
        value: 'Light',
    },
];

const ThemeToggleScreen = () => {
    const theme = useTheme();
    const [selectedTheme, setSelectedTheme] = useState('automatic');

    const handleThemeSelection = (newTheme: string) => {
        console.log(newTheme);
        setSelectedTheme(newTheme);
    };

    const IconSvgDark = {
        automatic: SVG.AutomaticDark,
        moon: SVG.SmallMoonDark,
    };

    const IconSvgLight = {
        automatic: SVG.AutomaticLight,
        sun: SVG.SmallSunDark,
    };

    return (
        <PDSafeAreaView bgColor="white">
            <ModalHeader />
            <ScrollView contentContainerStyle={ styles.contentContainer }>
                <PDView style={ styles.subContainer }>
                    <PDView style={ styles.imageContainer }>
                    { theme.isDarkMode ? <Image source={ images.moonBig } /> : <Image source={ images.sunBig } />}
                    </PDView>
                    <PDText type="subHeading" color="black" textAlign="center">
                        Dive into our New Themes
                    </PDText>

                    <PDView style={ { marginHorizontal: PDSpacing.lg } }>
                        <PDText type="bodySemiBold" color="greyDark" textTransform="uppercase">
                            Choose Theme
                        </PDText>
                        <PDView style={ { marginVertical: PDSpacing.md } }>
                            {themeOptions.map(option => (
                                <TouchableScale key={ option.value } onPress={ () => handleThemeSelection(option.key) }>
                                    <PDView  bgColor="greyLighter" style={ styles.renderItemContainer } >
                                        {selectedTheme === option.key ? <SVG.IconCircleCheckmark color={ theme.colors.green }/> : <SVG.IconEmptyCircle  color={ theme.colors.white }/>}
                                        <PDView style={ { marginLeft: PDSpacing.sm } }>
                                            <PDText type="bodyRegular" color="greyDarker">{option.value}</PDText>
                                        </PDView>
                                    </PDView>
                                </TouchableScale>
                                ))}
                        </PDView>
                    </PDView>

                    <PDView style={ { marginHorizontal: PDSpacing.lg , flexDirection: 'row', alignItems: 'center' } }>
                        { theme.isDarkMode ? <SVG.SmallMoonDark /> : <SVG.SmallSun />}
                        <PDView style={ { marginHorizontal: PDSpacing.sm } }>
                            <PDText type="bodyRegular" color="black">
                                Automatic Switching
                            </PDText>
                            <PDText type="tooltip" color="greyDark">
                                Pooldash will use your system-level settings
                            </PDText>
                        </PDView>
                    </PDView>

                </PDView>
                <TextButton
                    onPress={ () => {} }
                    containerStyles={ [styles.buttonContainer , { backgroundColor: theme.colors.greyLightest }] }
                    textStyles={ [styles.buttonText, { color: theme.colors.black } ] }
                    text="Looks Great" />
            </ScrollView>
        </PDSafeAreaView>
    );
};

export default ThemeToggleScreen;

const styles = StyleSheet.create({
    contentContainer: {
        flex:1,
        justifyContent:'space-between',
    },
    subContainer:{
        flex:1,
        justifyContent:'space-evenly',
    },
    imageContainer:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    subHeadingContainer: {
        marginVertical: PDSpacing.lg,
    },
    buttonContainer: {
        height: 40,
        width: '100%',
        borderRadius: 27.5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    renderItemContainer: {
        flexDirection:'row',
        alignItems: 'center',
        borderRadius: 12,
        marginBottom: PDSpacing.xs,
        padding: PDSpacing.sm,
    },
});
