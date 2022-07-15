import React from 'react';
import { useTypedSelector } from '~/redux/AppState';
import { useDeviceSettings } from '~/services/DeviceSettings/Hooks';
import { FormulaService } from '~/services/FormulaService';


interface TreatmentListScreenState {

}

export const useTreatmentListState = (): TreatmentListScreenState => {
    const readings = useTypedSelector((state) => state.readingEntries);
    const pool = useTypedSelector(state => state.selectedPool);
    const pickerState = useTypedSelector((state) => state.pickerState);
    const { ds, updateDS } = useDeviceSettings();
    const formulaId = pool?.formulaId || FormulaService.defaultFormulaId;
    const [treatmentStates, setTreatmentStates] = React.useState<TreatmentState[]>([]);
    const [hasSelectedAnyTreatments, setHasSelectedAnyTreatments] = React.useState(false);
    const [notes, setNotes] = React.useState('');
    const { navigate } = useNavigation<StackNavigationProp<PDNavParams>>();
    // I hate this... it's dirty. We should move this into the picker screen maybe?
    const [concentrationTreatmentVar, updateConcentrationTreatment] = React.useState<string | null>(null);
    const formula = useLoadFormulaHook(formulaId);
    const targetRangeOverridesForPool = useRealmPoolTargetRangesForPool(pool?.objectId ?? null);
    const routesInNavStack = useNavigationState(state => state.routes.map(r => r.name));
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const [isSavingDebounce, setIsSavingDebounce] = React.useState(false);
    const allScoops = ds.scoops;
    const [haveCalculationsProcessed, setHaveCalculationsProcessed] = React.useState(false);
    const [userTS, setUserTS] = React.useState<number>(Date.now());
    const scrollViewRef = React.useRef<KeyboardAwareSectionList>(null);
    const [isShowingHelp, setIsShowingHelp] = React.useState(false);

    return {
        readings,
        pool,
        pickerState,

    };
};
