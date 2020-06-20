export class Config {
    static gql_url = __DEV__ ? 'https://dev-api.pooldash.com/graphql' : 'https://api.pooldash.com/graphql';
    static web_url = __DEV__ ? 'https://dev.pooldash.com' : 'https://pooldash.com';
}