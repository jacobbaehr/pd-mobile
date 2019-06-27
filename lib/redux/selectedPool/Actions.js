"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("repository/Database");
exports.SAVE_POOL = 'SAVE_POOL';
exports.SELECT_POOL = 'SELECT_POOL';
exports.UPDATE_POOL = 'UPDATE_POOL';
// Saves the pool to the database, tells Redux about it.
exports.saveNewPool = (pool) => {
    Database_1.Database.saveNewPool(pool);
    return {
        type: exports.SAVE_POOL,
        pool: pool
    };
};
exports.updatePool = (updatedPool) => {
    Database_1.Database.updatePool(updatedPool);
    return {
        type: exports.UPDATE_POOL,
        pool: updatedPool
    };
};
// Sets the currently selected pool id
exports.selectPool = (pool) => {
    return {
        type: exports.SELECT_POOL,
        pool
    };
};
//# sourceMappingURL=Actions.js.map