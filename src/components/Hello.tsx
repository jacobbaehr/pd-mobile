// src/components/Hello.tsx
import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

interface Props {
    personName: string;
    enthusiasmLevel: number;
}

interface State {
    enthusiasmOffset: number;
}

export class Hello extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            enthusiasmOffset: 0,
        };
    }

    private handleIncrement = (): void => {
        this.setState({
            enthusiasmOffset: this.state.enthusiasmOffset + 1,
        });
    };

    private handleDecrement = (): void => {
        this.setState({
            enthusiasmOffset: this.state.enthusiasmOffset - 1,
        });
    };

    private getExclamationMarks = (numChars: number): string => {
        return Array(numChars + 1).join('!');
    };

    render() {
        const enthusiasmLevel = this.props.enthusiasmLevel + this.state.enthusiasmOffset;

        if (enthusiasmLevel <= 0) {
            throw new Error('You could be a little more enthusiastic. :D');
        }

        return (
            <View style={styles.root}>
                <Text style={styles.greeting}>
                    Hello {this.props.personName + this.getExclamationMarks(enthusiasmLevel)}
                </Text>
                <View style={styles.buttons}>
                    <View style={styles.button}>
                        <Button title="-" onPress={this.handleDecrement} color="red" />
                    </View>
                    <View style={styles.button}>
                        <Button title="+" onPress={this.handleIncrement} color="blue" />
                    </View>
                </View>
            </View>
        );
    }
}
// styles

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttons: {
        flexDirection: 'row',
        minHeight: 70,
        alignItems: 'stretch',
        alignSelf: 'center',
        borderWidth: 5,
    },
    button: {
        flex: 1,
        paddingVertical: 0,
    },
    greeting: {
        color: '#999',
        fontWeight: 'bold',
    },
});
