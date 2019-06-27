"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticatedApiManager_1 = require("api/AuthenticatedApiManager");
/**
 * API manager class used to send requests to Pool Dash API `/pool/{poolId}/logEntries` endpoint
 */
class LogEntryApiManager extends AuthenticatedApiManager_1.AuthenticedApiManager {
    /**
     * Get all of the log entries for a given pool since a given date, where the date is optional
     */
    getLogEntriesForPool(poolId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            // const request: GetLogEntriesRequest = {
            //     pool_id: poolId
            // };
            // if (date) {
            //     request.ts = date.getTime();
            // }
            // return await this.makeRequest<GetLogEntriesResponse>(
            //     HttpRequestTypes.GET, 
            //     null,
            //     `/pools/${poolId}/logs`,
            //     request);
            return yield this.req();
        });
    }
    buildErrorFromAxioError(error) {
        return error;
    }
}
exports.LogEntryApiManager = LogEntryApiManager;
//# sourceMappingURL=LogEntryApiManager.js.map