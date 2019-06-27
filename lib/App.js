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
const React = require("react");
const react_redux_1 = require("react-redux");
const Navigators_1 = require("navigator/Navigators");
const Actions_1 = require("redux/hasValidSubscription/Actions");
const Actions_2 = require("redux/user/Actions");
const CognitoService_1 = require("services/CognitoService");
const InAppPurchasesService_1 = require("services/InAppPurchasesService");
class AppComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.configureIAP = (user) => __awaiter(this, void 0, void 0, function* () {
            // Setup IAP configuration
            yield InAppPurchasesService_1.InAppPurchasesService.configureInAppPurchasesProvider(user.getUsername(), (info) => {
                // handle any changes to purchaserInfo
                console.warn('user purchase info updated', info);
                if (info.activeEntitlements.length !== 0) {
                    this.props.dispatch(Actions_1.updateValidSubscription(true));
                }
            });
            // Check for existing subscription
            const hasExisting = yield InAppPurchasesService_1.InAppPurchasesService.hasExistingSubscription();
            console.warn('user has existing - ', hasExisting);
            this.props.dispatch(Actions_1.updateValidSubscription(hasExisting));
        });
        this.cognitoService = new CognitoService_1.CognitoService();
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            const cognitoUser = yield this.cognitoService.loadUserIfExists();
            if (cognitoUser) {
                const cognitoSession = yield this.cognitoService.loadUserSessionIfExists(cognitoUser);
                const userEmail = yield this.cognitoService.getUserAttribute('email', cognitoUser);
                const userFirstName = yield this.cognitoService.getUserAttribute('given_name', cognitoUser);
                const userLastName = yield this.cognitoService.getUserAttribute('family_name', cognitoUser);
                const user = {
                    email: userEmail.getValue(),
                    firstName: userFirstName.getValue(),
                    lastName: userLastName.getValue(),
                    auth: {
                        cognitoUser,
                        cognitoSession
                    }
                };
                console.warn('loading user - ', user);
                this.props.dispatch(Actions_2.hydrateUserAction(user));
                this.configureIAP(cognitoUser);
            }
        });
    }
    render() {
        return (React.createElement(Navigators_1.PDNav, null));
    }
}
exports.AppComponent = AppComponent;
exports.App = react_redux_1.connect()(AppComponent);
//# sourceMappingURL=App.js.map