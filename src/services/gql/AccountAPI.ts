import gql from 'graphql-tag';

export const POOLS = gql`
    query Pools {
        pools {
            count
        }
        me {
            joined_ts
            email
        }
    }
`;


