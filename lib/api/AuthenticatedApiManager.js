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
const api_1 = require("@aws-amplify/api");
const react_native_config_1 = require("react-native-config");
const BaseApiManager_1 = require("./BaseApiManager");
class AuthenticedApiManager extends BaseApiManager_1.BaseApiManager {
    constructor(baseUrl, tokenResolver, user) {
        super(baseUrl);
        this.tokenResolver = tokenResolver;
        this.configureAmplify(user);
    }
    configureAmplify(user) {
        api_1.default.configure({
            Auth: {
                // REQUIRED - Amazon Cognito Identity Pool ID
                identityPoolId: react_native_config_1.default.AWS_IDENTITY_POOL_ID,
                // REQUIRED - Amazon Cognito Region
                region: react_native_config_1.default.AWS_REGION,
                // OPTIONAL - Amazon Cognito User Pool ID
                userPoolId: react_native_config_1.default.AWS_USER_POOL_ID,
                // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
                userPoolWebClientId: react_native_config_1.default.AWS_USER_POOL_CLIENT_ID
            },
            API: {
                endpoints: [
                    {
                        name: "API",
                        endpoint: `https://${react_native_config_1.default.API_ENDPOINT}`,
                    }
                ]
            }
        });
    }
    req() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.warn('requesting...');
                const bob = yield api_1.default.get('API', `/pools/39d/logs`, {});
                console.warn(bob);
                return bob;
            }
            catch (e) {
                console.warn('here');
                console.warn(e);
            }
        });
    }
    /**
     * Make API request with the given config, appends AUTHORIZATION header
     * @param method type of request to send
     * @param endpoint endpoint of url to send request to
     * @param headers headers to add to request
     * @param urlParams query parameters for request
     * @param requestBody body of request
     */
    makeRequest(method, headers = {}, endpoint, urlParams, requestBody) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            const headersPlusAuthorization = Object.assign({}, headers, { authorization: this.tokenResolver() });
            return _super("makeRequest").call(this, method, headersPlusAuthorization, endpoint, urlParams, requestBody);
        });
    }
}
exports.AuthenticedApiManager = AuthenticedApiManager;
//# sourceMappingURL=AuthenticatedApiManager.js.map