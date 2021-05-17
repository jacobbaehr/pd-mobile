import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { useTheme } from '~/components/PDTheme';

/**
 * Switches the color scheme of the status bar
 * to the constrast color under the current theme
 */
export const useContrastStatusBar = () => {
    const { statusBarContrast } = useTheme();

    useFocusEffect(() => {
      StatusBar.setBarStyle(statusBarContrast);
    });
};

/**
 * Switches the color scheme of the status bar
 * to the default color under the current theme
 */
 export const useStandardStatusBar = () => {
    const { statusBarDefault } = useTheme();

    useFocusEffect(() => {
        StatusBar.setBarStyle(statusBarDefault);
    });
};
