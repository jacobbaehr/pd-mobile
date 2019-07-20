"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const React = require("react");
const react_native_1 = require("react-native");
const react_native_webview_1 = require("react-native-webview");
class ChartCard extends React.PureComponent {
    constructor(props) {
        super(props);
        this.getDateLabels = () => {
            let count = 0;
            if (this.props.viewModel.timestamps.length === 0) {
                return [];
            }
            const first = this.props.viewModel.timestamps[0];
            const last = this.props.viewModel.timestamps[this.props.viewModel.timestamps.length - 1];
            const dateFormat = 'MMM';
            return [
                this.formatTimestamp(first, dateFormat),
                this.formatTimestamp(last, dateFormat)
            ].map(range => React.createElement(react_native_1.Text, { style: styles.labelText, key: count++ }, range));
        };
        this.formatTimestamp = (ts, df) => {
            return moment(ts).format(df);
        };
        this.onChartsLoaded = (args) => {
            if (this.webView !== null) {
                const labels = this.props.viewModel.timestamps.map(d => this.formatTimestamp(d, 'MMM D, ha'));
                console.log(labels);
                console.log(this.props.viewModel.timestamps);
                const graphData = {
                    points: this.props.viewModel.values,
                    dates: labels,
                    idealMin: 2000,
                    idealMax: 3500
                };
                this.webView.injectJavaScript(`setTimeout(() => {
                window.graphData(${JSON.stringify(graphData)});
            }, 100);`);
            }
        };
        this.webView = null;
    }
    render() {
        const chartPath = react_native_1.Platform.OS === 'android' ? 'file:///android_asset/charts/Charts.html' : './web.bundle/Charts.html';
        return (React.createElement(react_native_1.View, { style: [styles.container, this.props.containerStyles] },
            React.createElement(react_native_1.Text, { style: styles.title }, this.props.viewModel.title),
            React.createElement(react_native_1.View, { style: styles.chartContainer },
                React.createElement(react_native_1.View, { style: styles.chartWebViewContainer },
                    React.createElement(react_native_webview_1.WebView, { ref: (ref) => { this.webView = ref; }, onLoadEnd: this.onChartsLoaded, originWhitelist: ['*'], source: { uri: chartPath }, scrollEnabled: false, style: styles.chartWebView, useWebKit: true })),
                React.createElement(react_native_1.View, { style: styles.labelContainer }, this.getDateLabels())),
            this.props.children));
    }
}
exports.ChartCard = ChartCard;
const styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 2, },
        shadowColor: 'grey',
        shadowOpacity: 0.3,
        paddingTop: 10,
        flex: 1,
        borderRadius: 8,
        paddingBottom: 10,
        minHeight: 175
    },
    title: {
        paddingHorizontal: 20,
        fontSize: 18,
        fontWeight: '600',
        marginBottom: -20,
        zIndex: 999,
        fontFamily: 'Avenir Next',
        color: '#676767'
    },
    chartContainer: {
        paddingHorizontal: 15,
        alignItems: 'center',
        width: '100%'
    },
    labelContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    chartWebViewContainer: {
        flex: 1,
        height: 175,
        width: '100%',
        marginHorizontal: 15,
        overflow: 'hidden'
    },
    chartWebView: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    labelText: {
        fontSize: 18,
        fontWeight: '500',
        fontFamily: 'Avenir Next',
        color: '#676767'
    }
});
//# sourceMappingURL=ChartCard.js.map