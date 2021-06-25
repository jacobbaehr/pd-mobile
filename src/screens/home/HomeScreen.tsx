import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SearchInput } from '~/components/inputs/SearchInput';
import { PDSafeAreaView } from '~/components/PDSafeAreaView';
import { useTheme } from '~/components/PDTheme';
import { useStandardStatusBar } from '~/hooks/useStatusBar';
import { Pool } from '~/models/Pool';
import { PDStackNavigationProps } from '~/navigator/shared';
import { selectPool } from '~/redux/selectedPool/Actions';
import { Haptic } from '~/services/HapticService';
import { useNavigation } from '@react-navigation/native';
import { SearchHeader } from './SearchHeader';
import { usePoolSearch } from './usePoolSearch';
import { PoolList, PoolListProps } from './PoolList';
import { QuickStartView } from './QuickStartView';

export const HomeScreen = () => {
    const { navigate } = useNavigation<PDStackNavigationProps>();
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState<string>('');
    const pools = usePoolSearch(searchText);
    useStandardStatusBar();
    const theme = useTheme();

    const handlePoolPressed = (item: Pool) => {
        Haptic.light();
        dispatch(selectPool(item));
        navigate('PoolScreen');
    };

    const handleEnterReadingsPressed = (item: Pool) => {
        Haptic.medium();
        dispatch(selectPool(item));
        navigate('ReadingList');
    };

    const handleUpgradePressed = () => {
        navigate('Subscription');
    };

    const handleSearchTextChanged = useCallback(
        (newText: string) => {
            setSearchText(newText);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [searchText],
    );

    const handleSeeAllPressed = () => {
        setSearchText('');
    };

    const poolListProps: PoolListProps = {
        pools,
        handlePoolPressed,
        handleEnterReadingsPressed,
        searchText,
        handleSeeAllPressed,
        handleUpgradePressed,
    };

    const isEmpty = (!searchText) && (pools.length === 0);
    const content = isEmpty
        ? <QuickStartView />
        : <PoolList { ...poolListProps }/>;

    return (
        <PDSafeAreaView bgColor="white" forceInset={ { bottom: 'never' } } style={ { backgroundColor: theme.colors.white } }>
            <SearchHeader numPools={ pools.length } searchText={ searchText }>
                <SearchInput value={ searchText } onChangeText={ handleSearchTextChanged } />
            </SearchHeader>
            {content}
        </PDSafeAreaView>
    );
};
