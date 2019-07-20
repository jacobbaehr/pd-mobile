"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const react_native_keyboard_aware_scroll_view_1 = require("react-native-keyboard-aware-scroll-view");
const react_native_material_dropdown_1 = require("react-native-material-dropdown");
const react_navigation_1 = require("react-navigation");
const GradientButton_1 = require("components/buttons/GradientButton");
const PDText_1 = require("components/PDText");
const PoolDetailsHeader_1 = require("./PoolDetailsHeader");
const TextInputWithTitle_1 = require("components/TextInputWithTitle");
const waterTypes = [{ value: 'Salt Water' }, { value: 'Chlorine' }];
class PoolDetails extends React.Component {
    constructor() {
        super(...arguments);
        // Extracts section header from section list object
        this.renderHeader = (passedHeader) => {
            return React.createElement(PDText_1.PDText, { style: styles.sectionHeader }, passedHeader.section.title);
        };
    }
    render() {
        const { header, originalPoolName, goBack, rightButtonAction } = this.props;
        return (React.createElement(react_navigation_1.SafeAreaView, { style: styles.safeArea },
            React.createElement(react_native_keyboard_aware_scroll_view_1.KeyboardAwareScrollView, null,
                React.createElement(react_native_1.View, null,
                    React.createElement(PoolDetailsHeader_1.EditListHeader, { handleBackPress: () => goBack(), header: header, buttonText: originalPoolName, rightButtonAction: rightButtonAction }),
                    React.createElement(PDText_1.PDText, { style: styles.sectionHeader }, "Basic Information"),
                    React.createElement(react_native_1.View, { style: styles.listContainer },
                        React.createElement(TextInputWithTitle_1.TextInputWithTitle, { titleText: 'Name', onTextChanged: (s) => this.props.updateText('name', s), titleTextStyles: styles.poolNameLabel, inputStyles: styles.textInput, autoCapitalize: 'sentences', autoCorrect: false, keyboardType: 'default' })),
                    React.createElement(react_native_1.View, { style: styles.listContainer },
                        React.createElement(PDText_1.PDText, { style: styles.waterTypeLabel }, "Water Type"),
                        React.createElement(react_native_material_dropdown_1.Dropdown, { data: waterTypes, value: this.props.type, textColor: '#1E6BFF', itemTextStyle: {
                                color: '#1E6BFF',
                                fontWeight: '500',
                                fontSize: 22
                            }, fontSize: 22, onChangeText: (t) => this.props.updateText(t, 'type') })),
                    React.createElement(react_native_1.View, { style: styles.listContainer },
                        React.createElement(TextInputWithTitle_1.TextInputWithTitle, { titleText: 'Volume', subtitleText: '(Gallons)', onTextChanged: (s) => this.props.updateText('name', s), titleTextStyles: styles.poolNameLabel, subtitleTextStyles: styles.poolNameSubLabel, inputStyles: styles.textInput, autoCapitalize: 'sentences', autoCorrect: false, keyboardType: 'default' })),
                    React.createElement(GradientButton_1.GradientButton, { onPress: () => this.props.handleSavePoolPressed(), title: 'Save', containerStyles: styles.startServiceButton })))));
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
    waterTypeLabel: {
        justifyContent: 'center',
        color: '#000000',
        fontWeight: '600',
        fontSize: 22,
        marginBottom: -20
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