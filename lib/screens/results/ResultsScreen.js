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
const react_native_1 = require("react-native");
const react_redux_1 = require("react-redux");
const Database_1 = require("repository/Database");
const CalculationService_1 = require("services/CalculationService");
const GradientButton_1 = require("components/buttons/GradientButton");
const LogEntry_1 = require("models/logs/LogEntry");
const RecipeRepository_1 = require("repository/RecipeRepository");
const mapStateToProps = (state, ownProps) => {
    return {
        navigation: ownProps.navigation,
        readings: state.readingEntries,
        recipeId: state.recipeId,
        pool: state.selectedPool
    };
};
class ResultsScreenComponent extends React.Component {
    constructor(props) {
        super(props);
        this.save = () => __awaiter(this, void 0, void 0, function* () {
            const id = Math.random().toString(36).slice(2);
            const ts = new Date().getTime();
            const logEntry = LogEntry_1.LogEntry.make(id, this.props.pool.objectId, ts, this.props.readings, this.state.treatmentEntries, this.props.recipeId);
            console.log(logEntry);
            yield Database_1.Database.saveNewLogEntry(logEntry);
            this.props.navigation.popToTop();
        });
        this.recipeRepo = new RecipeRepository_1.RecipeRepository();
        console.log('1');
        this.state = { treatmentEntries: [] };
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            this.recipe = yield this.recipeRepo.loadLocalRecipeWithId(this.props.recipeId);
            const treatmentEntries = CalculationService_1.CalculationService.calculateTreatments(this.recipe, this.props.pool, this.props.readings);
            console.log('2');
            this.setState({
                treatmentEntries,
                recipe: this.recipe
            });
        });
    }
    render() {
        let treatmentString = '';
        this.state.treatmentEntries.forEach(treatmentEntry => {
            treatmentString += `\nAdd ${treatmentEntry.amount} ounces of ${treatmentEntry.treatmentName}`;
        });
        return (React.createElement(react_native_1.View, { style: styles.container },
            React.createElement(react_native_1.Text, { style: styles.text }, treatmentString),
            React.createElement(GradientButton_1.GradientButton, { title: 'save', onPress: this.save, containerStyles: styles.button })));
    }
}
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'orange'
    },
    text: {
        margin: 15,
        justifyContent: 'center',
        color: 'white'
    },
    button: {
        marginHorizontal: 15,
        height: 100
    }
});
exports.ResultsScreen = react_redux_1.connect(mapStateToProps)(ResultsScreenComponent);
//# sourceMappingURL=ResultsScreen.js.map