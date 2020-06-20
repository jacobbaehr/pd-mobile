import { Recipe_latestRecipe, Recipe_latestRecipe_readings, Recipe_latestRecipe_treatments } from "./generated/Recipe";
import { Recipe } from "~/models/recipe/Recipe";
import { Reading, ReadingType } from "~/models/recipe/Reading";
import { Treatment, TreatmentType } from "~/models/recipe/Treatment";

export class RecipeTransformer {
    static fromAPI = (apiRec: Recipe_latestRecipe): Recipe => {
        return {
            ...apiRec,
            readings: apiRec.readings.map(ar => RecipeTransformer.readingFromAPI(ar)),
            treatments: apiRec.treatments.map(at => RecipeTransformer.treatmentFromAPI(at))
        }
    }

    static readingFromAPI = (apiReading: Recipe_latestRecipe_readings): Reading => {
        return {
            ...apiReading,
            type: apiReading.type as ReadingType,
            idealMax: apiReading.idealMax,
            idealMin: apiReading.idealMin,
            sliderMax: apiReading.sliderMax || 0,
            sliderMin: apiReading.sliderMin || 0,
            decimalPlaces: apiReading.decimalPlaces || 0
        }
    }

    static treatmentFromAPI = (apiTreatment: Recipe_latestRecipe_treatments): Treatment => {
        return {
            ...apiTreatment,
            type: apiTreatment.type as TreatmentType
        }
    }
}