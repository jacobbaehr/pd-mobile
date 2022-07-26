import { useNavigation } from '@react-navigation/native';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { PDTheme, useTheme } from '~/components/PDTheme';
import { Formula } from '~/formulas/models/Formula';
import { useLastLogEntryHook, useLoadFormulaHook } from '~/hooks/RealmPoolHook';
import { useStandardStatusBar } from '~/hooks/useStatusBar';
import { LogEntryV4 } from '~/models/logs/LogEntry/LogEntryV4';
import { IPool } from '~/models/Pool';
import { PDNavParams, PDStackNavigationProps } from '~/navigator/shared';
import { useTypedSelector } from '~/redux/AppState';
import { ReadingState } from './ReadingListItem';


interface ReadingListScreenState {
    isSliding: boolean;
    setIsSliding: React.Dispatch<React.SetStateAction<boolean>>;
    readingStates: ReadingState[];
    setReadingStates: React.Dispatch<React.SetStateAction<ReadingState[]>>;
    pool: IPool | null;
    formula: Formula;
    setOptions: (options: Partial<StackNavigationOptions>) => void;
    navigate: StackNavigationProp<PDNavParams>;
    theme: PDTheme;
    lastLogEntry: LogEntryV4 | null;
    insets: EdgeInsets;
}

export const useReadingListState = (): ReadingListScreenState => {
    const [isSliding, setIsSliding] = React.useState(false);
    const [readingStates, setReadingStates] = React.useState<ReadingState[]>([]);
    const pool = useTypedSelector(state => state.selectedPool);
    const formula = useLoadFormulaHook(pool?.formulaId);
    const { setOptions } = useNavigation<PDStackNavigationProps>();
    const navigate = useNavigation<StackNavigationProp<PDNavParams>>();
    const theme = useTheme();
    const lastLogEntry = useLastLogEntryHook(pool?.objectId ?? '');
    const insets = useSafeAreaInsets();
    useStandardStatusBar();

    return {
        isSliding,
        setIsSliding,
        readingStates,
        setReadingStates,
        pool,
        formula,
        setOptions,
        navigate,
        theme,
        lastLogEntry,
        insets,
    };
};
