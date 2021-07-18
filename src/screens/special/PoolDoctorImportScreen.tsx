import * as React from 'react';
import { PDMigrator } from '~/services/migrator/NativeModule';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { NativeEventEmitter, StyleSheet } from 'react-native';
import { ScreenHeader } from '~/components/headers/ScreenHeader';
import { PDSafeAreaView } from '~/components/PDSafeAreaView';
import { PDText } from '~/components/PDText';
import { PDSpacing, useTheme } from '~/components/PDTheme';
import { PlayButton } from '~/components/buttons/PlayButton';
import { PDView } from '~/components/PDView';
import { PoolDoctorImportService, PoolDoctorPool } from '~/services/special/PoolDoctorImportService';
import { useNavigation } from '@react-navigation/native';
import { PDStackNavigationProps } from '~/navigator/shared';
import { useImportablePools } from './PoolDoctorImportHooks';
import { Haptic } from '~/services/HapticService';
import { BoringButton } from '~/components/buttons/BoringButton';
import pluralize from 'pluralize';
import { ScrollView } from 'react-native-gesture-handler';
import { ForumPrompt } from '../home/footer/ForumPrompt';
import { useStandardStatusBar } from '~/hooks/useStatusBar';
import { Config } from '~/services/Config/AppConfig';


export const PoolDoctorImportScreen: React.FC = () => {
    const [hasImported, setHasImported] = useState(false);
    const [hasStartedImport, setHasStartedImport] = useState(false);
    const [createdPools, setCreatedPools] = useState(0);
    const [skippedPools, setSkippedPools] = useState(0);
    const [createdLogs, setCreatedLogs] = useState(0);
    const [skippedLogs, setSkippedLogs] = useState(0);
    const numPools = useImportablePools();
    useStandardStatusBar();

    const theme = useTheme();
    const { navigate } = useNavigation<PDStackNavigationProps>();

    const goHome = () => {
        navigate('Home');
    };

    // called whenever the native module learns about a new pool:
    const poolListener = useCallback(async (e: PoolDoctorPool) => {
        const result = await PoolDoctorImportService.importPool(e);
        if (result.poolStatus === 'created') {
            setCreatedPools(cp => cp + 1);
        } else if (result.poolStatus === 'skipped') {
            setSkippedPools(up => up + 1);
        }
        setSkippedLogs(sl => sl + result.logsSkipped);
        setCreatedLogs(cl => cl + result.logsCreated);
    }, [setSkippedPools, setCreatedPools, setCreatedLogs, setSkippedLogs]);

    useEffect(() => {
        // If we're all done importing:
        if (!hasStartedImport) { return; }
        if (skippedPools + createdPools + 1 === numPools) {
            setHasImported(true);
        }
    }, [skippedPools, createdPools, numPools, hasStartedImport]);


    useEffect(() => {
        if (!Config.isIos) { return; }
        const emitter = new NativeEventEmitter(PDMigrator);
        emitter.addListener('pool', poolListener);
        return () => {
            emitter.removeAllListeners('pool');
        };
    }, [poolListener]);

    const handleImportPressed = () => {
        if (!Config.isIos) { return; }
        if (hasStartedImport) { return; }

        Haptic.light();

        setHasStartedImport(true);
        setCreatedPools(0);
        setSkippedPools(0);
        setSkippedLogs(0);
        setCreatedLogs(0);

        // This causes a bunch of "pool" events to get fired.
        PDMigrator.importAllPools();
    };

    const getContent = () => {
        if (!Config.isIos) {
            return <PDText type="bodyMedium" color="greyDarker">Sorry, this only imports data from the Pool Doctor iPhone app.</PDText>;
        }
        if (numPools === 0) {
            return <>
                <PDText type="bodyMedium" color="greyDarker">No pools found. Make sure you have installed and opened the latest version of the Pool Doctor app.</PDText>
                <BoringButton title="Go Home" onPress={ goHome } containerStyles={ { backgroundColor: theme.colors.blue } } />
            </>;
        }
        if (hasImported) {
            return <>
                <PDText type="subHeading" color="greyDarker">
                    { createdPools } {pluralize('pool', createdPools)} created!
                </PDText>
                <PDText type="bodyMedium" color="greyDarker">
                    { skippedPools } {pluralize('pool', skippedPools)} skipped
                </PDText>
                <PDText type="subHeading" color="greyDarker">
                    { createdLogs } log {pluralize('entry', createdLogs)} created!
                </PDText>
                <PDText type="bodyMedium" color="greyDarker">
                    { skippedLogs } log {pluralize('entry', skippedLogs)} skipped
                </PDText>
                <BoringButton title="Go Home" onPress={ goHome } containerStyles={ { backgroundColor: theme.colors.blue, marginTop: PDSpacing.lg } } />
            </>;
        }
        return (
            <>
                <PDText type="heading" color="greyDarker" style={ styles.bottomSpace }>
                    { numPools } {pluralize('pool', numPools)} found!
                </PDText>
                <PDText type="bodyMedium" color="greyDarker" style={ { marginBottom: PDSpacing.md } }>
                    This imports pools and their history from the Pool Doctor app.
                </PDText>
                <PDText type="bodyMedium" color="greyDarker" style={ { marginBottom: PDSpacing.md } }>
                    It's safe to run multiple times (we shouldn't duplicate anything already imported).
                </PDText>
                <PDText type="bodyMedium" color="greyDarker" style={ { marginBottom: PDSpacing.md } }>
                    Thank you so much for continuing to try my apps. Please leave feedback in the forum if you have any questions, and keep in mind that Pool Doctor is 11 years old, so I couldn't get all of the data to import cleanly.
                </PDText>
                <PlayButton title={ `Import ${numPools} ${pluralize('Pool', numPools)}` } onPress={ handleImportPressed } />
            </>
        );
    };

    return (
        <PDSafeAreaView style={ { backgroundColor: theme.colors.white } } forceInset={ { bottom: 'never' } } >
                <ScreenHeader textType="heading" color="blue">
                    Pool Doctor Import
                </ScreenHeader>
                <ScrollView style={ { flex: 1 } }>
                <PDView style={ styles.container }>
                    { getContent() }
                    <PDText type="bodyMedium" color="greyDarker" style={ { marginTop: PDSpacing.xl } }>Want to import pools from somewhere else? Tell us on the support forum:</PDText>
                    <ForumPrompt />
                </PDView>
            </ScrollView>
        </PDSafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: PDSpacing.md,
    },
    content: {
        paddingHorizontal: 18,
        paddingTop: 18,
        marginBottom: 18,
    },
    bottomSpace: {
        marginBottom: PDSpacing.sm,
    },
});

