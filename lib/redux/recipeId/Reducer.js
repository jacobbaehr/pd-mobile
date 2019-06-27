"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Actions_1 = require("./Actions");
exports.recipeIdReducer = (previousState = null, action) => {
    switch (action.type) {
        case Actions_1.SELECT_RECIPE:
            const selectRecipeAction = action;
            return selectRecipeAction.recipe.objectId;
        default:
            return previousState;
    }
};
//# sourceMappingURL=Reducer.js.map