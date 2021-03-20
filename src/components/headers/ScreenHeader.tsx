import * as React from 'react';
import { StyleSheet } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { SVG } from '~/assets/images';
import { PDText } from '~/components/PDText';
import { PDSpacing, useTheme } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';

import { useNavigation } from '@react-navigation/native';

interface ScreenHeaderProps {
    hasBackButton?: boolean;
    hasAddButton?: boolean;
    handlePressedAdd?: () => void;
}
export const ScreenHeader: React.FC<ScreenHeaderProps> = (props) => {
    const { goBack } = useNavigation();
    const { children, hasAddButton, hasBackButton, handlePressedAdd } = props;
    const theme = useTheme();

    const handlePressedBack = () => {
        goBack();
    };

    const hitSlop = 5;

    const touchableProps = {
        activeScale: 0.97,
        hitSlop: { top: hitSlop, left: hitSlop, bottom: hitSlop, right: hitSlop },
    };

    return (
        <PDView style={styles.container} bgColor="white">
            <PDView style={styles.sideContainer}>
                {hasBackButton && (
                    <TouchableScale {...touchableProps} onPress={handlePressedBack}>
                        <SVG.IconCircleBack fill={theme.blue} />
                    </TouchableScale>
                )}
            </PDView>
            <PDView style={styles.centerContainer}>
                <PDText type="heading" color="black" style={styles.text}>
                    {children}
                </PDText>
            </PDView>
            <PDView style={styles.sideContainer}>
                {hasAddButton && (
                    <TouchableScale {...touchableProps} onPress={handlePressedAdd}>
                        <SVG.IconCircleAdd fill={theme.blue} />
                    </TouchableScale>
                )}
            </PDView>
        </PDView>
    );
};

ScreenHeader.defaultProps = {
    hasBackButton: false,
    hasAddButton: false,
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: PDSpacing.md,
        paddingVertical: PDSpacing.sm,
        borderBottomColor: '#EDEDED',
        borderBottomWidth: 2,
    },
    sideContainer: {
        flexShrink: 1,
        minWidth: 32,
    },
    centerContainer: {
        flexGrow: 2,
    },
    text: {
        textAlign: 'center',
    },
});
