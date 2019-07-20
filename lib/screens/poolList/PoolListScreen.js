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
// @ts-ignore
const react_navigation_fluid_transitions_1 = require("react-navigation-fluid-transitions");
const react_redux_1 = require("react-redux");
const PDText_1 = require("components/PDText");
const Actions_1 = require("redux/selectedPool/Actions");
const AppState_1 = require("redux/AppState");
const Database_1 = require("repository/Database");
const PoolListFooter_1 = require("./PoolListFooter");
const PoolListItem_1 = require("./PoolListItem");
const RecipeRepository_1 = require("repository/RecipeRepository");
const mapStateToProps = (state, ownProps) => {
    return {
        navigation: ownProps.navigation,
        selectedPool: state.selectedPool,
        poolsLastUpdated: state.poolsLastUpdated,
        user: state.user
    };
};
class PoolListScreenComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handlePoolSelected = (pool) => __awaiter(this, void 0, void 0, function* () {
            yield AppState_1.dispatch(Actions_1.selectPool(pool));
            this.props.navigation.navigate('PoolScreen');
        });
        this.handleAddPoolPressed = () => __awaiter(this, void 0, void 0, function* () {
            yield AppState_1.dispatch(Actions_1.selectPool(null));
            this.props.navigation.navigate('CreatePool');
        });
        this.state = {
            initialLoadFinished: false
        };
        this.recipeRepo = new RecipeRepository_1.RecipeRepository();
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            // Fetch pools from persistent storage
            Database_1.Database.prepare().then(() => {
                this.pools = Database_1.Database.loadPools();
                console.log(this.pools);
                this.setState({
                    initialLoadFinished: true
                });
                // Don't await this, assume it finishes on time (TODO: add state to make sure)
                this.recipeRepo.savePreloadedRecipes();
            }).catch((e) => {
                console.error(e);
            });
        });
    }
    render() {
        const pools = (this.pools === undefined) ? [] : this.pools.map(p => p);
        const isEmpty = pools.length === 0;
        return (React.createElement(react_navigation_1.SafeAreaView, { style: { flex: 1, backgroundColor: '#F8F8F8' }, forceInset: { bottom: 'never' } },
            React.createElement(react_native_1.ScrollView, { style: { flex: 1 } },
                React.createElement(react_native_1.View, { style: styles.container },
                    React.createElement(react_navigation_fluid_transitions_1.Transition, { appear: 'top' },
                        React.createElement(react_native_1.View, null,
                            React.createElement(PDText_1.PDText, { style: [styles.title, styles.titleTop] }, "My"),
                            React.createElement(PDText_1.PDText, { style: [styles.title, styles.titleBottom] }, "Pools"))),
                    React.createElement(react_native_1.SectionList, { style: { flex: 1 }, renderItem: ({ item }) => React.createElement(PoolListItem_1.PoolListItem, { pool: item, onPoolSelected: () => this.handlePoolSelected(item) }), renderSectionHeader: ({ section }) => null, sections: [
                            { data: pools, title: 'Pools' }
                        ], renderSectionFooter: ({ section }) => React.createElement(PoolListFooter_1.PoolListFooter, { isEmpty: isEmpty, handlePress: this.handleAddPoolPressed }), keyExtractor: item => item.objectId, overScrollMode: 'always' })))));
    }
}
exports.PoolListScreen = react_redux_1.connect(mapStateToProps)(PoolListScreenComponent);
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'transparent'
    },
    editStyle: {
        margin: 5,
        marginRight: 10,
    },
    title: {
        marginLeft: 12,
        fontSize: 28,
        fontWeight: 'bold'
    },
    titleBottom: {
        color: '#1E6BFF',
        marginBottom: 12
    },
    titleTop: {
        color: '#000',
        marginBottom: -3
    }
});
//# sourceMappingURL=PoolListScreen.js.map