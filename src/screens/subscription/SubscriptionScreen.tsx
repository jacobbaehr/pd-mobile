import React from 'react';
import { Linking, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PDButton } from '~/components/buttons/PDButton';
import { ScreenHeader } from '~/components/headers/ScreenHeader';
import { HR } from '~/components/Hr';
import { PDSafeAreaView } from '~/components/PDSafeAreaView';
import { PDText } from '~/components/PDText';
import { PDSpacing, useTheme } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';

export const SubscriptionScreen: React.FC = () => {
    const theme = useTheme();

    const handlePatreonPressed = async () => {
        Linking.openURL('https://patreon.com/gazzini');
    };

    const handleGithubPressed = async () => {
        Linking.openURL('https://github.com/pooldash/pd-mobile');
    };

    return (
        <PDSafeAreaView bgColor="white" forceInset={ { bottom: 'never' } }>
            <ScreenHeader color="blue" textType="heading">
                Pooldash
            </ScreenHeader>
            <ScrollView style={ [styles.content, { backgroundColor: theme.colors.greyLighter } ] }>
                <PDView>
                    <PDText type="subHeading">
                        👋 Hi, I'm John!
                    </PDText>
                    <PDText type="bodyRegular" color="greyDark" numberOfLines={ 0 } style={ { marginTop: PDSpacing.xs } }>
                        I used to clean pools, and now I'm an engineer. Thanks for using Pooldash!
                    </PDText>
                </PDView>
                <HR/>
                <PDText type="subHeading">
                    Subscribe
                </PDText>
                <PDText type="bodyRegular" color="greyDark" numberOfLines={ 0 } style={ { marginTop: PDSpacing.xs } }>
                    Many people who enjoy using Pooldash also enjoy this Patreon page! However, per section 3.1.1 of the App Store Review Guidelines, this Patreon is in no way associated with any digital content here, including the app itself.
                </PDText>
                <PDText type="bodyRegular" color="greyDark" numberOfLines={ 0 } style={ { marginTop: PDSpacing.xs } }>
                    Let's all thank the App Review team for this clarification!
                </PDText>
                <PDView style={ styles.buttonContainer }>
                    <PDButton onPress={ handlePatreonPressed } bgColor="blue">
                        Open Patreon
                    </PDButton>
                </PDView>
                <HR/>
                <PDText type="subHeading">
                    Explore
                </PDText>
                <PDText type="bodyRegular" color="greyDark" numberOfLines={ 0 } style={ { marginTop: PDSpacing.xs } }>
                    Want to explore the code? It's open source:
                </PDText>
                <PDView style={ styles.buttonContainer }>
                    <PDButton onPress={ handleGithubPressed } bgColor="greyDarker">
                        Open GitHub
                    </PDButton>
                </PDView>
            </ScrollView>
        </PDSafeAreaView>
    );
};

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: PDSpacing.md,
        paddingTop: PDSpacing.lg,
    },
    buttonContainer: {
        marginTop: PDSpacing.lg,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    buttonIcon: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 4,
    },
});
