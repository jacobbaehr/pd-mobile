import { useEffect } from 'react';
import {  } from '~/components/list/PDSectionList';


import { PDSection } from '~/components/list/models';

export const useAccount = () => {

    useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const accountSection : PDSection[] = [
        {
            title: 'account information',
            data: [
                {
                    id: 'calendar',
                    image: 'IconCal',
                    label: 'Account Created: 5/5/21',
                    valueColor: 'orange',
                    onPress: null,
                    animationIndex: 0,
                },
                {
                    id: 'pages',
                    image: 'IconPages',
                    label: 'Number of Pools: 13',
                    valueColor: 'pink',
                    onPress: null,
                    animationIndex: 1,
                },
                {
                    id: 'page',
                    image: 'IconPaper',
                    label: 'Number of Entries: 102',
                    valueColor: 'pink',
                    onPress: null,
                    animationIndex: 2,
                },
                {
                    id: 'sync',
                    image: 'IconVerified',
                    label: 'Sync Data: 100%',
                    valueColor: 'pink',
                    onPress: null,
                    animationIndex: 3,
                },
            ],
        },
        {
            title: 'additional actions',
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
                    id: 'emailSupport',
                    image: 'IconEmail',
                    label: 'Email support',
                    valueColor: 'black',
                    onPress: () => {},
                    animationIndex: 5,
                },
                {
                    id: 'logOut',
                    image: 'IconLogOut',
                    label: 'Log out',
                    valueColor: 'black',
                    onPress: () => {},
                    animationIndex: 6,
                },
            ],
        },
    ];

    return accountSection;
};
