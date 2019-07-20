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
const react_native_keyboard_aware_scroll_view_1 = require("react-native-keyboard-aware-scroll-view");
const react_native_material_dropdown_1 = require("react-native-material-dropdown");
const react_navigation_1 = require("react-navigation");
const GradientButton_1 = require("components/buttons/GradientButton");
const PDText_1 = require("components/PDText");
const Actions_1 = require("redux/selectedPool/Actions");
const AppState_1 = require("redux/AppState");
const Database_1 = require("repository/Database");
const PoolDetailsHeader_1 = require("./PoolDetailsHeader");
const TextInputWithTitle_1 = require("components/TextInputWithTitle");
class PoolDetails extends React.Component {
    constructor() {
        super(...arguments);
        this.renderItems = (passedItem) => {
            const { updateText } = this.props;
            return (React.createElement(react_native_1.View, { style: styles.listContainer },
                React.createElement(react_native_1.View, { style: { display: 'flex', flexDirection: 'row' } },
                    React.createElement(PDText_1.PDText, { style: styles.poolNameLabel }, passedItem.item.label),
                    React.createElement(PDText_1.PDText, { style: styles.poolNameSubLabel }, passedItem.item.subLabel)),
                React.createElement(react_native_1.TextInput, { style: styles.textInput, value: String(passedItem.item.value), onChangeText: (t) => updateText(t, passedItem.item.state), keyboardType: 'default' })));
        };
        this.renderFields = (objArr) => {
            return objArr.map((i, k) => {
                switch (i.inputType) {
                    case 'input':
                        return (React.createElement(react_native_1.View, { style: styles.listContainer, key: k },
                            React.createElement(react_native_1.View, { style: { display: 'flex', flexDirection: 'row' } },
                                React.createElement(PDText_1.PDText, { style: styles.poolNameLabel }, i.label),
                                React.createElement(PDText_1.PDText, { style: styles.poolNameSubLabel }, i.subLabel)),
                            this.renderTextInput(i)));
                    case 'select':
                        return (React.createElement(react_native_1.View, { style: styles.listContainer, key: k },
                            React.createElement(react_native_1.View, { style: { display: 'flex', flexDirection: 'row' } },
                                React.createElement(PDText_1.PDText, { style: styles.poolNameLabel }, i.label),
                                React.createElement(PDText_1.PDText, { style: styles.poolNameSubLabel }, i.subLabel)),
                            this.renderSelector(i)));
                }
            });
        };
        this.handleDeletePoolSelected = (pool) => __awaiter(this, void 0, void 0, function* () {
            AppState_1.dispatch(Actions_1.selectPool());
            yield Database_1.Database.deletePool(pool);
            this.props.navigation.navigate('PoolList');
        });
        this.renderSelector = (obj) => {
            const { updateText } = this.props;
            return (React.createElement(react_native_material_dropdown_1.Dropdown, { data: obj.data, value: obj.value, textColor: '#1E6BFF', itemTextStyle: {
                    color: '#1E6BFF',
                    fontWeight: '500',
                    fontSize: 22
                }, fontSize: 22, dropdownOffset: { top: 0, left: 0 }, onChangeText: (t) => updateText(t, obj.stateName) }));
        };
        this.renderTextInput = (obj) => {
            const { updateText } = this.props;
            return (React.createElement(react_native_1.TextInput, { style: styles.textInput, onChangeText: (t) => updateText(t, obj.stateName), value: String(obj.value) }));
        };
        // Extracts section header from section list object
        this.renderHeader = (passedHeader) => {
            return React.createElement(PDText_1.PDText, { style: styles.sectionHeader }, passedHeader.section.title);
        };
    }
    render() {
        const { header, selectedPool, goBack, buttonAction, data } = this.props;
        const deletePoolButton = this.props.pool ?
            (React.createElement(GradientButton_1.GradientButton, { onPress: () => this.handleDeletePoolSelected(this.props.pool), title: 'Delete Pool', containerStyles: styles.startServiceButton })) : null;
        return (React.createElement(react_navigation_1.SafeAreaView, { style: styles.safeArea },
            React.createElement(react_native_keyboard_aware_scroll_view_1.KeyboardAwareScrollView, null,
                React.createElement(react_native_1.View, null,
                    React.createElement(PoolDetailsHeader_1.EditListHeader, { handleBackPress: () => goBack(), header: header, buttonText: selectedPool, actions: () => buttonAction() }),
                    React.createElement(PDText_1.PDText, { style: styles.sectionHeader }, "Basic Information"),
                    React.createElement(TextInputWithTitle_1.TextInputWithTitle, { titleText: 'Name', onTextChanged: (s) => this.props.updateText('name', s), 
                        // containerStyles?: StyleProp<ViewStyle>;
                        // titleTextStyles?: StyleProp<TextStyle>;
                        // inputStyles?: StyleProp<ViewStyle & TextStyle>;
                        // secureTextEntry?: boolean;
                        autoCapitalize: 'sentences', autoCorrect: false, keyboardType: 'default' }),
                    this.renderFields(data),
                    deletePoolButton))));
    }
}
exports.PoolDetails = PoolDetails;
const styles = react_native_1.StyleSheet.create({
    safeArea: {
        backgroundColor: '#ffffff',
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#ffffff',
    },
    listContainer: {
        paddingTop: 10,
        paddingHorizontal: 20
    },
    poolNameLabel: {
        justifyContent: 'center',
        color: '#000000',
        fontWeight: '600',
        fontSize: 22
    },
    poolNameSubLabel: {
        justifyContent: 'center',
        color: '#1E6BFF',
        fontWeight: '600',
        fontSize: 22
    },
    textInput: {
        borderBottomWidth: 2,
        borderBottomColor: '#D0D0D0',
        color: '#1E6BFF',
        fontWeight: '500',
        fontSize: 22
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: '#005C9E',
        height: 45,
        margin: 15
    },
    sectionHeader: {
        marginTop: 20,
        marginHorizontal: 15,
        fontWeight: '700',
        fontSize: 28
    },
    startServiceButton: {
        height: 67,
        paddingHorizontal: 6
    },
});
//# sourceMappingURL=PoolDetails.js.map