"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const SiteListItem_1 = require("./SiteListItem");
class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.handleSiteSelected = (name) => {
            console.log('name: ' + name);
            this.props.navigation.navigate('Details', { name });
        };
        this.state = {
            sites: ['Site 1',
                'Site 2',
                'Wawa',
                'Buckeyes']
        };
    }
    render() {
        return (React.createElement(react_native_1.View, { style: styles.container },
            React.createElement(react_native_1.SectionList, { style: { flex: 1 }, renderItem: ({ item }) => React.createElement(SiteListItem_1.SiteListItem, { name: item, onSiteSelected: this.handleSiteSelected }), renderSectionHeader: ({ section }) => React.createElement(react_native_1.Text, null, section.title), sections: [
                    { data: this.state.sites, title: 'Section 1' }
                ] })));
    }
}
exports.HomeScreen = HomeScreen;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
//# sourceMappingURL=HomeScreen.js.map