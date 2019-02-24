import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { SelectableTextButton } from 'components/buttons/SelectableTextButton';

interface DateRangeSelectorProps {
    /** Callback invoked when the range is updated by the user with the new range */
    onRangeUpdated: (currentDateRange: string) => void;
    /** Array of date ranges to render in component */
    dateRange: string[];
}

interface DateRangeSelectorState {
    currentDateRange: string;
}

export class DateRangeSelector extends React.PureComponent<DateRangeSelectorProps, DateRangeSelectorState> {
    constructor(props: DateRangeSelectorProps) {
        super(props);

        this.state = {
            currentDateRange: ''
        };
    }

    handleDateRangeChanged = (selectedDateRange: string) => {
        this.setState({ currentDateRange: selectedDateRange });
        this.props.onRangeUpdated(selectedDateRange);
    }

    private getButtons = () => {
        let count = 0;
        return this.props.dateRange.map((range: string) =>
            <SelectableTextButton
                key={count++}
                buttonText={range}
                onPress={this.handleDateRangeChanged}
                isSelected={range === this.state.currentDateRange} />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.getButtons()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    }
});