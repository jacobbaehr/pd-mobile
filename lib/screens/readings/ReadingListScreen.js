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
const Button_1 = require("components/buttons/Button");
const ReadingListItem_1 = require("./ReadingListItem");
const RecipeRepository_1 = require("repository/RecipeRepository");
const ReadingListHeader_1 = require("./ReadingListHeader");
const ReadingListSectionHeader_1 = require("./ReadingListSectionHeader");
const mapStateToProps = (state, ownProps) => {
    return {
        navigation: ownProps.navigation,
        entries: state.readingEntries,
        recipeId: state.recipeId,
        pool: state.selectedPool
    };
};
class ReadingListScreenComponent extends React.Component {
    constructor(props) {
        super(props);
        this.getRemainingReadings = () => {
            const recipe = this.state.recipe;
            if (recipe === undefined) {
                return [];
            }
            return recipe.readings.filter(reading => {
                let inputComplete = false;
                this.props.entries.forEach(entry => {
                    if (entry.readingId === reading.objectId) {
                        inputComplete = true;
                    }
                });
                return !inputComplete;
            });
        };
        this.handleReadingSelected = (input, inputEntry) => {
            const springAnimationProperties = {
                type: react_native_1.LayoutAnimation.Types.spring,
                property: react_native_1.LayoutAnimation.Properties.scaleXY,
                springDamping: 0.7
            };
            //   const fadeAnimationProperties = {
            //     type: LayoutAnimation.Types.spring,
            //     property: LayoutAnimation.Properties.opacity,
            //     springDamping: 0.3
            //   };
            const animationConfig = {
                duration: 500,
                create: undefined,
                update: springAnimationProperties,
                delete: undefined
            };
            react_native_1.LayoutAnimation.configureNext(animationConfig);
            this.setState({
                activeReadingId: input.objectId
            });
        };
        this.handleInputReadingSelected = (reading, readingEntry) => {
            this.props.navigation.navigate('Details', { reading, readingEntry });
        };
        this.handleCalculatePressed = () => {
            this.props.navigation.navigate('Results');
        };
        this.handleBackPressed = () => {
            this.props.navigation.goBack();
        };
        this.getEntryForReading = (reading) => {
            // array length will always be 0 (if entry not made) or 1 (if entry made)
            let entriesForInput = this.props.entries.filter(entry => entry.readingId === reading.objectId);
            if (entriesForInput.length === 0) {
                return undefined;
            }
            return entriesForInput[0];
        };
        this.state = {
            activeReadingId: undefined
        };
        this.recipeRepo = new RecipeRepository_1.RecipeRepository();
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recipe = yield this.recipeRepo.loadLocalRecipeWithId(this.props.recipeId);
                this.setState({ recipe });
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    render() {
        const remaining = this.getRemainingReadings();
        let sections = [{ data: remaining, title: 'Remaining Readings' }];
        let completed = [];
        let hasTakenEveryReading = false;
        let progress = 0;
        const recipe = this.state.recipe;
        if (recipe !== undefined) {
            // TODO: clean this up
            const completed = recipe.readings.filter(reading => remaining.filter(incomplete => incomplete.objectId == reading.objectId).length == 0);
            progress = (recipe.readings.length == 0)
                ? 1
                : (completed.length / recipe.readings.length);
            hasTakenEveryReading = completed.length == recipe.readings.length;
            let sections = [{ data: remaining, title: 'Remaining Readings' }];
            if (completed.length > 0) {
                sections.push({ data: completed, title: 'Completed Readings' });
            }
        }
        return (React.createElement(react_navigation_1.SafeAreaView, { style: { flex: 1, backgroundColor: '#F8F8F8' }, forceInset: { bottom: 'never', top: 'never' } },
            React.createElement(react_native_1.View, { style: styles.container },
                React.createElement(react_native_1.SectionList, { style: styles.sectionList, ListHeaderComponent: React.createElement(ReadingListHeader_1.ReadingListHeader, { handleBackPress: this.handleBackPressed, pool: this.props.pool, percentComplete: progress }), renderItem: ({ item }) => React.createElement(ReadingListItem_1.ReadingListItem, { reading: item, readingEntry: this.getEntryForReading(item), onReadingSelected: this.handleReadingSelected, onInputReadingSelected: this.handleInputReadingSelected, isActive: this.state.activeReadingId == item.objectId }), renderSectionHeader: ({ section }) => React.createElement(ReadingListSectionHeader_1.ReadingListSectionHeader, { title: section.title }), sections: sections, keyExtractor: item => item.objectId, contentInsetAdjustmentBehavior: 'always', stickySectionHeadersEnabled: false }),
                React.createElement(Button_1.Button, { styles: styles.button, onPress: this.handleCalculatePressed, title: "Calculate", disabled: !hasTakenEveryReading }))));
    }
}
exports.ReadingListScreen = react_redux_1.connect(mapStateToProps)(ReadingListScreenComponent);
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#F8F8F8',
    },
    sectionList: {
        flex: 1
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: '#005C9E',
        height: 45,
        margin: 5
    }
});
//# sourceMappingURL=ReadingListScreen.js.map