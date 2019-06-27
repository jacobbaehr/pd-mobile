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
const axios_1 = require("axios");
var HttpRequestTypes;
(function (HttpRequestTypes) {
    HttpRequestTypes["GET"] = "get";
    HttpRequestTypes["PUT"] = "put";
    HttpRequestTypes["POST"] = "post";
    HttpRequestTypes["DELETE"] = "delete";
})(HttpRequestTypes = exports.HttpRequestTypes || (exports.HttpRequestTypes = {}));
/**
 * Base API class used to configure requests to a specific URL
 */
class BaseApiManager {
    constructor(baseUrl) {
        this.axiosInstance = axios_1.default.create({
            baseURL: baseUrl
        });
    }
    /**
     * Make API request with the given config
     * @param method type of request to send
     * @param endpoint endpoint of url to send request to
     * @param headers headers to add to request
     * @param urlParams query parameters for request
     * @param requestBody body of request
     */
    makeRequest(method, headers = {}, endpoint, urlParams, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.axiosInstance.request({
                    method,
                    url: endpoint,
                    headers,
                    params: urlParams,
                    data: requestBody
                });
                return { response: res };
            }
            catch (e) {
                return { error: this.buildErrorFromAxioError(e) };
            }
        });
    }
}
exports.BaseApiManager = BaseApiManager;
//# sourceMappingURL=BaseApiManager.js.map