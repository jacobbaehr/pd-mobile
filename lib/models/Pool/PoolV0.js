"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a swimming pool (duh).
 */
class PoolV0 {
    static make(name, volume, waterType) {
        const pool = new PoolV0();
        pool.name = name;
        pool.volume = volume;
        pool.waterType = 'Chlorine';
        return pool;
    }
}
// For Realm purposes
PoolV0.schema = {
    name: 'Pool',
    primaryKey: 'objectId',
    properties: {
        volume: 'double',
        name: 'string',
        objectId: 'string',
        recipeId: 'string?',
        waterType: 'string'
    }
};
exports.PoolV0 = PoolV0;
//# sourceMappingURL=PoolV0.js.map