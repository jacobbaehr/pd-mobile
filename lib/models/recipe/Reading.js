"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a reading or observation to be taken during performance of a recipe
 */
class Reading {
    static make(name, variableName, objectId) {
        let reading = new Reading();
        reading.name = name;
        reading.variableName = variableName;
        return reading;
    }
}
// For Realm purposes
Reading.schema = {
    name: 'Reading',
    primaryKey: 'objectId',
    properties: {
        name: 'string',
        variableName: 'string',
        objectId: 'string'
    }
};
exports.Reading = Reading;
//# sourceMappingURL=Reading.js.map