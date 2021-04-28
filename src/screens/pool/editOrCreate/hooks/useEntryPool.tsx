import React, { useContext, useState } from 'react';
import { Pool } from '~/models/Pool';
import { useTypedSelector } from '~/redux/AppState';
import { RecipeService } from '~/services/RecipeService';

interface PartialPoolContext {
    pool: Partial<Pool>,
    setPool: React.Dispatch<React.SetStateAction<Partial<Pool>>>,
}

const createPoolDefaults: Partial<Pool> = {
    gallons: undefined,
    name: undefined,
    waterType: undefined,
    objectId: undefined,
    recipeKey: RecipeService.defaultRecipeKey,      // TODO: reconsider this
    wallType: 'vinyl',
};

const PartialPoolContext = React.createContext<PartialPoolContext>({
    pool: createPoolDefaults,
    // We're going to override this with the setState call in the PoolProvider component
    setPool: () => {console.log('this is the default issue');},
});

interface PoolProviderProps {
    initialPool: Pool | null;
}

export const PoolProvider: React.FC<PoolProviderProps> = (props) => {
    const [pool, setPool] = useState(props.initialPool ?? createPoolDefaults);

    const context = {
        pool,
        setPool,
    };

    return (
        <PartialPoolContext.Provider value={ context }>
            { props.children }
        </PartialPoolContext.Provider>
    );
};

// This hook allows both CreatePool and EditPool to access and Edit the Pool state
export const useEntryPool = () => {
    const { pool, setPool } = useContext(PartialPoolContext);

    /// When the selected recipe key in redux changes, update the partial pool.
    const selectedRecipeKey = useTypedSelector(state => state.selectedRecipeKey);
    React.useEffect(() => {
        if (selectedRecipeKey && selectedRecipeKey !== pool.recipeKey) {
            setPool({ ...pool, recipeKey: selectedRecipeKey });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRecipeKey]);

    const isRequiredFilledOut: boolean =
        !!pool.name &&
        !!pool.gallons &&
        !!pool.waterType;

    const setPoolValue = (newValue: Partial<Pool>) => {
        setPool({ ...pool, ...newValue });
    };

    return  {
        pool: pool,
        setPool: setPoolValue,
        isRequiredFilledOut,
    };
};
