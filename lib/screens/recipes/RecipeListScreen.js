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
const react_navigation_1 = require("react-navigation");
const react_redux_1 = require("react-redux");
const Actions_1 = require("redux/recipeId/Actions");
const AppState_1 = require("redux/AppState");
const Database_1 = require("repository/Database");
const BackButton_1 = require("components/buttons/BackButton");
const PDGradientText_1 = require("components/PDGradientText");
const GradientButton_1 = require("components/buttons/GradientButton");
const react_native_super_grid_1 = require("react-native-super-grid");
const RecipeService_1 = require("services/RecipeService");
const mapStateToProps = (state, ownProps) => {
    return {
        navigation: ownProps.navigation,
        pool: state.selectedPool
    };
};
class RecipeListScreenComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleRecipeSelected = (recipe) => {
            Database_1.Database.commitUpdates(() => {
                if (this.props.pool === undefined) {
                    return;
                }
                this.props.pool.recipeId = recipe.objectId;
            });
            AppState_1.dispatch(Actions_1.selectRecipe(recipe));
            this.props.navigation.navigate('ReadingList');
        };
        this.handleBackPressed = () => {
            this.props.navigation.goBack();
        };
        this.getBackButtonTitle = () => {
            const pool = this.props.pool;
            if (pool !== undefined) {
                return pool.name;
            }
            return '';
        };
        this.recipeService = new RecipeService_1.RecipeService();
        this.state = {
            initialLoadFinished: false
        };
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            // Fetch pool from persistent storage
            if (this.props.pool !== null && this.props.pool !== undefined) {
                this.props.navigation.setParams({ poolName: this.props.pool.name });
            }
            this.recipes = yield this.recipeService.fetchRecipeList();
            this.setState({ initialLoadFinished: true });
        });
    }
    render() {
        const recipes = (this.recipes === undefined) ? [] : this.recipes.map(p => p);
        return (React.createElement(react_navigation_1.SafeAreaView, { style: { flex: 1, backgroundColor: 'white' }, forceInset: { bottom: 'never' } },
            React.createElement(BackButton_1.BackButton, { title: this.getBackButtonTitle(), onPress: this.handleBackPressed }),
            React.createElement(PDGradientText_1.PDGradientText, { style: styles.gradientText, colors: gradientColors }, "Recipes"),
            React.createElement(react_native_1.View, { style: styles.container },
                React.createElement(react_native_1.ScrollView, { style: styles.scrollView },
                    React.createElement(GradientButton_1.GradientButton, { title: 'Use Default', onPress: () => { } }),
                    React.createElement(react_native_super_grid_1.FlatGrid, { itemDimension: 130, items: recipes, renderItem: ({ item }) => (React.createElement(react_native_1.Text, null,
                            item.name,
                            ": ",
                            item.id)) })))));
    }
}
RecipeListScreenComponent.navigationOptions = (navigation) => {
    const { state } = navigation;
    if (state === undefined) {
        return {};
    }
    const selectedPoolName = state.params.poolName;
    return { title: selectedPoolName };
};
exports.RecipeListScreen = react_redux_1.connect(mapStateToProps)(RecipeListScreenComponent);
const gradientColors = ['#07A5FF', '#FF0073'];
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#FFFFFF'
    },
    gradientText: {
        fontSize: 28,
        fontWeight: '700',
        marginTop: 3
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: '#005C9E',
        height: 45,
        margin: 15
    },
    editStyle: {
        margin: 5,
        marginRight: 10,
    },
    scrollView: {
        backgroundColor: '#F8F8F8'
    }
});
//# sourceMappingURL=RecipeListScreen.js.map