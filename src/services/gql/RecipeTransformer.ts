import {
    FetchRecipe_recipeVersion,
    FetchRecipe_recipeVersion_readings,
    FetchRecipe_recipeVersion_treatments,
} from './generated/FetchRecipe';
import { Recipe } from '~/models/recipe/Recipe';
import { Reading, ReadingType } from '~/models/recipe/Reading';
import { Treatment, TreatmentType } from '~/models/recipe/Treatment';

export class RecipeTransformer {
    static fromAPI = (apiRec: FetchRecipe_recipeVersion): Recipe => {
        return {
            ...apiRec,
            readings: apiRec.readings.map((ar) => RecipeTransformer.readingFromAPI(ar)),
            treatments: apiRec.treatments.map((at) => RecipeTransformer.treatmentFromAPI(at)),
        };
    };

    static readingFromAPI = (apiReading: FetchRecipe_recipeVersion_readings): Reading => {
        return {
            ...apiReading,
            type: apiReading.type as ReadingType,
            idealMax: apiReading.idealMax,
            idealMin: apiReading.idealMin,
            sliderMax: apiReading.sliderMax || 0,
            sliderMin: apiReading.sliderMin || 0,
            decimalPlaces: apiReading.decimalPlaces || 0,
        };
    };

    static treatmentFromAPI = (apiTreatment: FetchRecipe_recipeVersion_treatments): Treatment => {
        return {
            ...apiTreatment,
            type: apiTreatment.type as TreatmentType,
        };
    };
}
