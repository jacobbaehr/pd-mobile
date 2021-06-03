import { WallTypeValue } from './WallType';
import { WaterTypeValue } from './WaterType';

// We need to store plain-old-javascript-objects (POJOs) in the redux-state, because redux
// can't properly serialize & deserialize all the additional functions that Realm attaches
// to the models. So, we create a common interface between the POJOs and the Realm objects.

export interface IPool extends IPoolNoId {
    objectId: string;
}

export interface IPoolNoId {
    gallons: number;
    name: string;
    recipeKey?: string;
    waterType: WaterTypeValue;
    wallType: WallTypeValue;
    email?: string;
}
