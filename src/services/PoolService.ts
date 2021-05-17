import { Pool } from '~/models/Pool';

export namespace PoolService {
    /// If the input is a valid pool, it returns the input cast as a Pool.
    /// Otherwise, returns null.
    /// Does not check for ObjectId.
    export const validatePartial = (partial?: Partial<Pool>): Pool | null => {
        const isValid = partial &&
            partial.gallons &&
            partial.name &&
            partial.wallType &&
            partial.waterType;

        return isValid ? (partial as Pool) : null;
    };
}
