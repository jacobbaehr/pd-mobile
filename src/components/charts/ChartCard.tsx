import moment from 'moment';
import * as React from 'react';
import { Animated, Platform, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { WebView } from 'react-native-webview';

import { ChartCardViewModel } from './ChartCardViewModel';
import { Upgrade } from '../Upgrade';

interface ChartCardProps {
    viewModel: ChartCardViewModel;
    containerStyles?: StyleProp<ViewStyle>;
}

interface ChartCardState {
    overlayOpacity: Animated.Value;
}

export class ChartCard extends React.PureComponent<ChartCardProps, ChartCardState> {
    private webView: WebView | null;

    constructor(props: ChartCardProps) {
        super(props);
        this.webView = null;
        this.state = { overlayOpacity: new Animated.Value(0) };
    }

    componentDidMount() {
        // If unlocked, then hide the overlay
        if (this.props.viewModel.isUnlocked) {
            this.setState({
                overlayOpacity: new Animated.Value(0),
            });
        } else {
            Animated.timing(this.state.overlayOpacity, {
                delay: 800,
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }

    private getDateLabels = () => {
        let count = 0;
        if (this.props.viewModel.timestamps.length === 0) {
            return [];
        }
        const first = this.props.viewModel.timestamps[0];
        const last = this.props.viewModel.timestamps[this.props.viewModel.timestamps.length - 1];
        const dateFormat = 'MMM';
        return [this.formatTimestamp(first, dateFormat), this.formatTimestamp(last, dateFormat)].map((range) => (
            <Text style={styles.labelText} key={count++}>
                {range}
            </Text>
        ));
    };

    private formatTimestamp = (ts: number, df: string): string => {
        return moment(ts).format(df);
    };

    private onChartsLoaded = (args: any) => {
        if (this.webView !== null) {
            const labels = this.props.viewModel.timestamps.map((d) => this.formatTimestamp(d, 'MMM D, ha'));
            console.log(labels);
            console.log(this.props.viewModel.timestamps);
            const graphData = {
                points: this.props.viewModel.values,
                dates: labels,
                idealMin: this.props.viewModel.idealMin,
                idealMax: this.props.viewModel.idealMax,
            };
            const graphString = JSON.stringify(graphData);
            console.log('Graphing: ', graphString);
            this.webView.injectJavaScript(`setTimeout(() => {
                window.graphData(${graphString});
            }, 100);`);
        }
    };

    render() {
        const chartPath =
            Platform.OS === 'android' ? 'file:///android_asset/charts/Charts.html' : './web.bundle/Charts.html';

        return (
            <View style={[styles.container, this.props.containerStyles]}>
                <Text style={styles.title}>{this.props.viewModel.title}</Text>
                <View style={styles.chartContainer}>
                    <View
                        style={styles.chartWebViewContainer}
                        pointerEvents={this.props.viewModel.interactive ? 'auto' : 'none'}>
                        <WebView
                            ref={(ref) => {
                                this.webView = ref;
                            }}
                            onLoadEnd={this.onChartsLoaded}
                            originWhitelist={['*']}
                            source={{ uri: chartPath }}
                            scrollEnabled={false}
                            style={styles.chartWebView}
                        />
                    </View>
                    <View style={styles.labelContainer}>{this.getDateLabels()}</View>
                </View>
                {this.props.children}
                <Animated.View style={[styles.overlay, { opacity: this.state.overlayOpacity }]} pointerEvents={'none'}>
                    <Upgrade
                        style={styles.upgradeContainer}
                        onPress={() => {}}
                        isUnlocked={this.props.viewModel.isUnlocked}
                    />
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowColor: 'grey',
        shadowOpacity: 0.3,
        paddingTop: 10,
        flex: 1,
        borderRadius: 8,
        paddingBottom: 10,
        minHeight: 225,
        maxWidth: 405,
    },
    title: {
        paddingHorizontal: 20,
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'Avenir Next',
        color: '#676767',
    },
    chartContainer: {
        paddingHorizontal: 15,
        alignItems: 'center',
        width: '100%',
    },
    labelContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    chartWebViewContainer: {
        flex: 1,
        height: 225,
        width: '100%',
        marginHorizontal: 15,
        overflow: 'hidden',
    },
    chartWebView: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    labelText: {
        fontSize: 18,
        fontWeight: '500',
        fontFamily: 'Avenir Next',
        color: '#676767',
    },
    overlay: {
        position: 'absolute',
        display: 'flex',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'white',
        borderRadius: 24,
    },
    upgradeContainer: {
        position: 'relative',
        display: 'flex',
        flex: 1,
    },
});
