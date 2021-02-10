import { Reading } from './Reading';
import { TargetRange } from './TargetRange';
import { Treatment } from './Treatment';

/**
 * Represents the instructions for a pool treatment
 */
export interface Recipe {
    // The user-visible name of the recipe (ideally, should be unique)
    name: string;

    // A brief description of this recipe
    description: string;

    // The id of the recipe (multiple versions of the same recipe will have the same id)
    id: string;

    // The timestamp when this recipe was last updated (this + id == unique key)
    ts: number;

    // All the inputs to this recipe
    readings: Reading[];

    // All the outputs to this recipe
    treatments: Treatment[];

    // The minimum app version required to run the recipe successfully:
    appVersion: string;

    // TODO: think description
    custom: TargetRange[];
}
