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
const Pool_1 = require("models/Pool");
const Actions_1 = require("redux/selectedPool/Actions");
const AppState_1 = require("redux/AppState");
const Actions_2 = require("redux/selectedPool/Actions");
const Database_1 = require("repository/Database");
const PoolDetails_1 = require("./poolList/PoolDetails");
const mapStateToProps = (state, ownProps) => {
    return {
        navigation: ownProps.navigation,
        selectedPool: state.selectedPool
    };
};
class EditPoolComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeletePoolPressed = () => __awaiter(this, void 0, void 0, function* () {
            AppState_1.dispatch(Actions_2.selectPool());
            const pool = this.props.selectedPool;
            if (pool === undefined || pool === null) {
                return;
            }
            yield Database_1.Database.deletePool(pool);
            this.props.navigation.navigate('PoolList');
        });
        this.handleChange = (text, state) => {
            this.setState({
                [state]: text
            });
        };
        this.handleSaveButtonPressed = () => {
            // model the pool object
            // let pool = {} as Pool
            if (this.props.selectedPool) {
                const pool = Object.assign({}, this.props.selectedPool);
                pool.volume = Number(this.state.volume);
                pool.name = this.state.name;
                pool.waterType = this.state.type;
                // Update pool
                AppState_1.dispatch(Actions_1.updatePool(pool));
            }
            else {
                const pool = new Pool_1.Pool();
                pool.volume = Number(this.state.volume);
                pool.name = this.state.name;
                pool.waterType = this.state.type;
                // Create Pool
                AppState_1.dispatch(Actions_1.saveNewPool(pool));
            }
            // On success, navigate back to previous screen.
            this.props.navigation.goBack();
        };
        // Navigation option to go back to previous screen
        this.handleBackPressed = () => {
            this.props.navigation.goBack();
        };
        this.properCase = (text) => {
            const wordArr = text.split(' ');
            const work = wordArr.map(i => `${i.charAt(0).toUpperCase()}${i.slice(1)}`);
            return work.join(' ');
        };
        this.state = {
            volume: '',
            name: '',
            type: '',
            originalSelectedPoolName: ''
        };
    }
    componentDidMount() {
        if (this.props.selectedPool) {
            const pool = Object.assign({}, this.props.selectedPool);
            this.setState({
                volume: pool.volume,
                name: pool.name,
                type: pool.waterType,
                originalSelectedPoolName: pool.name
            });
        }
    }
    render() {
        const deleteButtonAction = (this.props.selectedPool === null || this.props.selectedPool === undefined)
            ? null
            : this.handleDeletePoolPressed;
        return (React.createElement(PoolDetails_1.PoolDetails, { header: this.props.selectedPool ? 'Edit' : 'Create', originalPoolName: this.state.originalSelectedPoolName, name: this.state.name, volume: this.state.volume || 0, type: this.state.type, goBack: this.handleBackPressed, updateText: (t, s) => this.handleChange(t, s), rightButtonAction: deleteButtonAction, navigation: this.props.navigation, pool: this.props.selectedPool, handleSavePoolPressed: this.handleSaveButtonPressed }));
    }
}
exports.EditPoolComponent = EditPoolComponent;
exports.EditPoolScreen = react_redux_1.connect(mapStateToProps)(EditPoolComponent);
//# sourceMappingURL=EditPoolScreen.js.map