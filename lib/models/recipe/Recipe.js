"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents the instructions for a pool treatment
 */
class Recipe {
    static make(name, description, readings, treatments) {
        let recipe = new Recipe();
        recipe.name = name;
        recipe.description = description;
        // TODO: verify that this works for to-many relationships in Realm.
        recipe.readings = readings;
        recipe.treatments = treatments;
        return recipe;
    }
}
// For Realm purposes
Recipe.schema = {
    name: 'Recipe',
    primaryKey: 'objectId',
    properties: {
        name: 'string',
        description: 'string',
        objectId: 'string',
        readings: 'Reading[]',
        treatments: 'Treatment[]'
    }
};
exports.Recipe = Recipe;
//# sourceMappingURL=Recipe.js.map