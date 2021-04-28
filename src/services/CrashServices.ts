import * as Sentry from '@sentry/react-native';

// https://docs.sentry.io/platforms/react-native
export namespace CrashServices {

    export const initialize = () => {
        if (!__DEV__) {
            // Sebas Key
            // TODO: needs to create an account for pooldash
            Sentry.init({
                release: '',
                dsn: 'https://f1c00333a0c5432489341a8bcfa5c7dc@o315261.ingest.sentry.io/5738409',
                debug: __DEV__,
                autoSessionTracking: true,
                // Session will close after 10 seconds in background
                sessionTrackingIntervalMillis: 10000,
              });
        }
    };

    export const captureNativeException = (error: any, ) => {
        Sentry.captureException(error);
    };

    export const addCrash = () => {
        Sentry.nativeCrash();
    };

}
