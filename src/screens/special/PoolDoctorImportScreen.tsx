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
import { IPool } from '~/models/Pool';
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
    const numPools = useImportablePools();
    useStandardStatusBar();

    const theme = useTheme();
    const { navigate } = useNavigation<PDStackNavigationProps>();

    const goHome = () => {
        navigate('Home');
    };

    // called whenever the native module learns about a new pool:
    const poolListener = useCallback(async (e: PoolDoctorPool) => {
        const p: IPool = PoolDoctorImportService.mapPoolDoctorPoolToPoolDashPool(e);
        const result = await PoolDoctorImportService.createOrOverwriteImportedPool(p);
        if (result === 'created') {
            setCreatedPools(cp => cp + 1);
        } else if (result === 'updated') {
            setSkippedPools(up => up + 1);
        }
    }, [setSkippedPools, setCreatedPools]);

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
                    { createdPools } pools created!
                </PDText>
                <PDText type="bodyMedium" color="greyDarker">
                    { skippedPools } pools skipped
                </PDText>
                <BoringButton title="Go Home" onPress={ goHome } containerStyles={ { backgroundColor: theme.colors.blue, marginTop: PDSpacing.lg } } />
            </>;
        }
        return (
            <>
                <PDText type="heading" color="greyDarker" style={ styles.bottomSpace }>
                    { numPools } {pluralize('pool', numPools)} found!
                </PDText>
                <PDText type="bodyMedium" color="greyDarker">
                    This action will import the pools from the Pool Doctor app, but not their history. If any of the pools have already been imported, they will be skipped (not duplicated).
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

