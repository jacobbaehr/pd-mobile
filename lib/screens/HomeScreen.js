"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const react_redux_1 = require("react-redux");
const SiteListItem_1 = require("./SiteListItem");
const mapStateToProps = (state, ownProps) => {
    return {
        navigation: ownProps.navigation,
        readings: state.readings
    };
};
class HomeScreenComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleSiteSelected = (name) => {
            console.log('name: ' + name);
            this.props.navigation.navigate('Details', { name });
        };
        this.state = {
            sites: ['Chlorine',
                'pH',
                'Total Alkalinity']
        };
    }
    render() {
        return (React.createElement(react_native_1.View, { style: styles.container },
            React.createElement(react_native_1.SectionList, { style: { flex: 1 }, renderItem: ({ item }) => React.createElement(SiteListItem_1.SiteListItem, { name: item, onSiteSelected: this.handleSiteSelected, key: item }), renderSectionHeader: ({ section }) => React.createElement(react_native_1.Text, null, section.title), sections: [
                    { data: this.state.sites, title: 'Readings' }
                ] })));
    }
}
exports.HomeScreen = react_redux_1.connect(mapStateToProps)(HomeScreenComponent);
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
//# sourceMappingURL=HomeScreen.js.map