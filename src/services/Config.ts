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
}
