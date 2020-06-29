import { Platform } from 'react-native';

export class Config {
    // static gql_url = __DEV__ ? 'https://dev-api.pooldash.com/graphql' : 'https://api.pooldash.com/graphql';
    // static web_url = __DEV__ ? 'https://dev.pooldash.com' : 'https://pooldash.com';
    static gql_url = 'https://dev-api.pooldash.com/graphql';
    static web_url = 'https://dev.pooldash.com';
    static forum_url = 'https://forum.pooldash.com';

    static isAndroid = Platform.OS === 'android';
    static isIos = Platform.OS === 'ios';
    static platformOS = Platform.OS;

    static revenueCatPublicKey = 'wciuClkgweIivYNTlQfmRfvRRoptoHGZ';

    static version = '1.0.0';       // TODO: don't forget to update this.
    static appStoreListing = Config.isIos ? 'https://itunes.apple.com/app/id1505607801' : '';
}
