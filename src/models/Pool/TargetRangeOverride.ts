import { Util } from '~/services/Util';

type EntryDefaultCustomTargets = {
    min: number;
    max: number;
    poolId: string;
    var: string;
    objectId: string;
};

type EntryValuesCustomTargets = {
    min: number;
    max: number;
};
export class TargetRangeOverride {
    // The id of this object
    objectId!: string;

    // Pool relates to custom target
    poolId!: string;

    // Variable to identify the custom target selected
    var!: string;

    // Min's value for the custom target
    min!: number;

    // Max's value for the custom target
    max!: number;

    // For Realm purposes
    static schema = {
        name: 'TargetRangeOverride',
        primaryKey: 'objectId',
        properties: {
            objectId: 'string',
            poolId: 'string',
            var: 'string',
            min: 'double',
            max: 'double',
        },
    };

    static make(customTarget: EntryDefaultCustomTargets, values: EntryValuesCustomTargets): TargetRangeOverride {
        let newCustomTarget = new TargetRangeOverride();
        newCustomTarget.objectId = customTarget?.objectId ?? Util.generateUUID();
        newCustomTarget.poolId = customTarget.poolId;
        newCustomTarget.var = customTarget.var;
        newCustomTarget.min = values.min;
        newCustomTarget.max = values.max;
        return newCustomTarget;
    }
}
