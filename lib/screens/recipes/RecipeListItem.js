"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const FontAwesome_1 = require("react-native-vector-icons/FontAwesome");
class RecipeListItem extends React.Component {
    constructor() {
        super(...arguments);
        this.handleButtonPressed = () => {
            this.props.onRecipeSelected(this.props.recipe);
        };
    }
    render() {
        const recipe = this.props.recipe;
        return (React.createElement(react_native_1.View, { style: styles.container },
            React.createElement(react_native_1.TouchableHighlight, { style: styles.content, onPress: this.handleButtonPressed },
                React.createElement(react_native_1.View, { style: { flex: 1 } },
                    React.createElement(react_native_1.Text, { style: styles.recipeNameText }, recipe.name),
                    React.createElement(react_native_1.Text, { style: styles.recipeDescriptionText },
                        recipe.description,
                        " "),
                    React.createElement(FontAwesome_1.default, { name: "chevron-right", style: styles.iconStyle })))));
    }
}
exports.RecipeListItem = RecipeListItem;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        height: 70,
    },
    content: {
        flex: 1,
        backgroundColor: '#0B1520',
        margin: 2,
        borderRadius: 3,
        borderWidth: .1,
        borderColor: '#BCBCC2',
        padding: 2
    },
    recipeNameText: {
        color: 'white',
        fontSize: 17,
    },
    recipeDescriptionText: {
        color: 'white',
        fontSize: 10,
        justifyContent: 'flex-end',
        marginTop: 10
    },
    iconStyle: {
        color: '#B3B3B3',
        alignSelf: 'flex-end',
        position: 'absolute',
        top: 25,
        fontSize: 15
    }
});
//# sourceMappingURL=RecipeListItem.js.map