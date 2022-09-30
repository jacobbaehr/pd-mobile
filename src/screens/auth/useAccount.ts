import { useEffect } from 'react';
import {  } from '~/components/list/PDSectionList';


import { PDSection } from '~/components/list/models';
import { POOLS } from '~/services/gql/AccountAPI';
import { useQuery } from '@apollo/client';
import { Pools } from '~/services/gql/generated/Pools';
import format from 'date-fns/format';

export const useAccount = () => {

    useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { loading, error, data } = useQuery<Pools>(POOLS);

    let dateString = '';
    if (data?.me?.joined_ts) {
        dateString = format(data.me.joined_ts, 'MM/dd/yyyy');
    }

    const accountSection : PDSection[] = [
        {
            title: 'info',
            data: [
                {
                    id: 'emailSupport',
                    image: 'IconEmail',
                    label: 'Email: ',
                    value: data?.me?.email,
                    valueColor: 'green',
                    onPress: null,
                    animationIndex: 0,
                },
                {
                    id: 'calendar',
                    image: 'IconCal',
                    value: dateString,
                    label: 'Created: ',
                    valueColor: 'purple',
                    onPress: null,
                    animationIndex: 1,
                },
                {
                    id: 'pages',
                    image: 'IconPages',
                    label: 'Pools: ',
                    value: loading ? '' : `${data?.pools.count}`,
                    valueColor: 'teal',
                    onPress: null,
                    animationIndex: 2,
                },
                {
                    id: 'page',
                    image: 'IconPaper',
                    label: 'Logs: ',
                    value: '102',
                    valueColor: 'orange',
                    onPress: null,
                    animationIndex: 3,
                },
                // {
                //     id: 'sync',
                //     image: 'IconVerified',
                //     label: 'Sync Data: 100%',
                //     valueColor: 'pink',
                //     onPress: null,
                //     animationIndex: 3,
                // },
            ],
        },
        {
            title: 'actions',
            data: [
                {
                    id: 'resetPassword',
                    image: 'IconReset',
                    label: 'Reset Password',
                    valueColor: 'black',
                    onPress: () => {},
                    animationIndex: 4,
                },
                {
                    id: 'logOut',
                    image: 'IconLogOut',
                    label: 'Log out',
                    valueColor: 'black',
                    onPress: () => {},
                    animationIndex: 5,
                },
            ],
        },
    ];

    return accountSection;
};
