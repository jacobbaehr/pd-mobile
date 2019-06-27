"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RECORD_INPUT = 'RECORD_INPUT';
exports.recordInput = (reading, value) => {
    return {
        type: exports.RECORD_INPUT,
        value,
        reading
    };
};
//# sourceMappingURL=Actions.js.map