"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SELECT_RECIPE = 'SELECT_RECIPE';
// Sets the currently selected recipe
exports.selectRecipe = (recipe) => {
    return {
        type: exports.SELECT_RECIPE,
        recipe
    };
};
//# sourceMappingURL=Actions.js.map