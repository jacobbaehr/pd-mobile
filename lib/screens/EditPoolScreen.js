"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const Pool_1 = require("models/Pool");
const Actions_1 = require("redux/selectedPool/Actions");
const AppState_1 = require("redux/AppState");
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
            selectedName: ''
        };
    }
    componentDidMount() {
        if (this.props.selectedPool) {
            const pool = Object.assign({}, this.props.selectedPool);
            this.setState({
                volume: pool.volume,
                name: pool.name,
                type: pool.waterType,
                selectedName: pool.name
            });
        }
    }
    render() {
        // pass a new object to the array to generate an input field
        // name
        const data = [
            { label: 'Name', stateName: 'name', value: this.state.name, inputType: 'input', },
            { label: 'Water Type', stateName: 'type', value: this.state.type, inputType: 'select', data: [{ value: 'Salt Water' }, { value: 'Chlorine' }] },
            { label: 'Volume', subLabel: ' (Gallons) ', stateName: 'volume', value: String(this.state.volume), inputType: 'input', }
        ];
        return (React.createElement(PoolDetails_1.PoolDetails, { header: this.props.selectedPool ? 'Edit' : 'Create', selectedPool: this.state.selectedName, data: data, name: this.state.name, volume: this.state.volume || 0, type: this.state.type, goBack: this.handleBackPressed, updateText: (t, s) => this.handleChange(t, s), buttonAction: this.handleSaveButtonPressed, navigation: this.props.navigation, pool: this.props.selectedPool }));
    }
}
exports.EditPoolComponent = EditPoolComponent;
exports.EditPoolScreen = react_redux_1.connect(mapStateToProps)(EditPoolComponent);
//# sourceMappingURL=EditPoolScreen.js.map