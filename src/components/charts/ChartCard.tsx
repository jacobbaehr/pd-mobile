import * as React from 'react';
import { Platform, StyleProp, StyleSheet, Text, View, ViewStyle, WebView } from 'react-native';

interface ChartCardProps {
    /** Title text of chard */
    titleText: string;
    /** Array of labels to render under the chart */
    dateRangeLabels: string[];
    /** Data to render inside of chart */
    values: number[];
    /** Optional styles applied to container */
    containerStyles?: StyleProp<ViewStyle>;
}

export class ChartCard extends React.Component<ChartCardProps> {
    private webView: WebView | null;

    constructor(props: ChartCardProps) {
        super(props);
        this.webView = null;
    }

    private getDateLabels = () => {
        let count = 0;
        return this.props.dateRangeLabels.map((range) =>
            <Text style={styles.labelText} key={count++}>{range}</Text>
        );
    }

    private onChartsLoaded = (args: any) => {
        if (this.webView !== null) {
            const graphData = {
                points: this.props.values,
                dates: this.props.dateRangeLabels,
                idealMin: 2000,
                idealMax: 3500
            };
            this.webView.postMessage(JSON.stringify(graphData));
        }
    }

    render() {
        const chartPath = Platform.OS === 'android' ? 'file:///android_asset/charts/Charts.html' : './web.bundle/Charts.html';
        return (
            <View style={[styles.container, this.props.containerStyles]}>
                <Text style={styles.title}>{this.props.titleText}</Text>
                <View style={styles.chartContainer} >
                    <View style={styles.chartWebViewContainer}>
                    <WebView
                        ref={(ref) => { this.webView = ref; }}
                        onLoadEnd={this.onChartsLoaded}
                        originWhitelist={['*']}
                        source={{ uri: chartPath }}
                        scrollEnabled={false}
                        style={styles.chartWebView}
                        useWebKit={true} />
                    </View>
                    <View style={styles.labelContainer}>
                        {this.getDateLabels()}
                    </View>
                </View>
                <>
                    {this.props.children}
                </>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 2, },
        shadowColor: 'grey',
        shadowOpacity: 0.3,
        paddingTop: 10,
        flex: 1,
        borderRadius: 8,
        paddingBottom: 10
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
        paddingHorizontal: 25,
        alignItems: 'center',
        width: '100%'
    },
    labelContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    chartWebViewContainer: {
        height: 175,
        width: 350,
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