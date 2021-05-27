import { Platform } from 'react-native';

export class Config {
    static gql_url = __DEV__ ? 'https://dev-api.pooldash.com/graphql' : 'https://api.pooldash.com/graphql';
    static web_url = __DEV__ ? 'https://pooldash.com' : 'https://pooldash.com';
    static web_app_url = __DEV__ ? 'https://dev.pooldash.com' : 'https://app.pooldash.com';
    static forum_url = 'https://forum.pooldash.com';

    static terms_url = `${Config.web_url}/terms`;
    static privacy_url = `${Config.web_url}/privacy`;

    static isAndroid = Platform.OS === 'android';
    static isIos = Platform.OS === 'ios';
    static platformOS = Platform.OS;

    static revenueCatPublicKey = 'wciuClkgweIivYNTlQfmRfvRRoptoHGZ';

    static version = '1.4.4';
    static appStoreListing = Config.isIos
        ? 'https://itunes.apple.com/app/id1505607801'
        : 'https://play.google.com/store/apps/details?id=com.gazzini.pooldash';
}
