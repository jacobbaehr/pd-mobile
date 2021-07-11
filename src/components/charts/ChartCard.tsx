import format from 'date-fns/format';
import * as React from 'react';
import { Animated, Platform, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { WebView } from 'react-native-webview';

import { PDText } from '../PDText';
import { PDView } from '../PDView';
import { Upgrade } from '../Upgrade';
import { ChartCardViewModel } from './ChartCardViewModel';

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
            // This has to be buried in a function to disable an annoying lint check:
            const update = () => {
                this.setState({
                    overlayOpacity: new Animated.Value(0),
                });
            };
            update();
        } else {
            Animated.timing(this.state.overlayOpacity, {
                delay: 800,
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
                isInteraction: false,
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
            <PDText style={ styles.labelText } key={ count++ }>
                {range}
            </PDText>
        ));
    };

    private formatTimestamp = (ts: number, df: string): string => {
        return format(ts, df);
    };

    private onChartsLoaded = () => {
        if (this.webView !== null) {
            const labels = this.props.viewModel.timestamps.map((d) => this.formatTimestamp(d, 'MMM d, ha'));
            const graphData = {
                points: this.props.viewModel.values,
                dates: labels,
                idealMin: this.props.viewModel.idealMin,
                idealMax: this.props.viewModel.idealMax,
            };
            const graphString = JSON.stringify(graphData);
            this.webView.injectJavaScript(`setTimeout(() => {
                window.graphData(${graphString});
            }, 100);`);
        }
    };

    render() {
        const chartPath =
            Platform.OS === 'android' ? 'file:///android_asset/charts/Charts.html' : './web.bundle/Charts.html';

        return (
            <PDView style={ [styles.container, this.props.containerStyles] }>
                <PDText style={ styles.title }>{this.props.viewModel.title}</PDText>
                <PDView style={ styles.chartContainer }>
                    <PDView
                        style={ styles.chartWebViewContainer }
                        pointerEvents={ this.props.viewModel.interactive ? 'auto' : 'none' }>
                        <WebView
                            ref={ (ref) => {
                                this.webView = ref;
                            } }
                            onLoadEnd={ this.onChartsLoaded }
                            originWhitelist={ ['*'] }
                            source={ { uri: chartPath } }
                            scrollEnabled={ false }
                            style={ styles.chartWebView }
                            androidHardwareAccelerationDisabled
                        />
                    </PDView>
                    <PDView style={ styles.labelContainer }>{this.getDateLabels()}</PDView>
                </PDView>
                {this.props.children}
                <Animated.View style={ [styles.overlay, { opacity: this.state.overlayOpacity }] } pointerEvents={ 'none' }>
                    <Upgrade
                        style={ styles.upgradeContainer }
                        onPress={ () => {} }
                        isUnlocked={ this.props.viewModel.isUnlocked }
                    />
                </Animated.View>
            </PDView>
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
        fontFamily: 'Poppins-Regular',
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
        fontFamily: 'Poppins-Regular',
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
