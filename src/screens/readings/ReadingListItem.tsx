import * as React from 'react';
import { View, StyleSheet, TouchableHighlight, Image } from 'react-native';

import { PDText } from '../../components/PDText';
import { ReadingEntry } from '../../models/logs/ReadingEntry';
import { Reading } from '../../models/recipe/Reading';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';

interface ReadingListItemProps {
    readingEntry?: ReadingEntry;
    reading: Reading;
    isActive: Boolean;

    onReadingSelected: (reading: Reading, readingEntry?: ReadingEntry) => void;
    onInputReadingSelected: (reading: Reading, readingEntry?: ReadingEntry) => void;
}

export class ReadingListItem extends React.Component<ReadingListItemProps, {}> {

    private handleCellPressed = (): void => {
        this.props.onReadingSelected(this.props.reading, this.props.readingEntry);
    }

    private handleInputButtonPressed = (): void => {
        this.props.onInputReadingSelected(this.props.reading, this.props.readingEntry);
    }

    render() {

        const entry = this.props.readingEntry;
        
        const readingTaken = (entry !== null) && (entry !== undefined);
        const leftImageSource = readingTaken
            ? require('../../assets/check.png')
            : require('../../assets/incomplete.png');
        
        const input = this.props.reading;
        const readingName = (input.name === undefined) ? 'Reading' : input.name;
        
        // const readingMessage = readingTaken ? `${entry!.value}` : `Input ${readingName}`;
        const buttonOrNothing = this.props.isActive
            ? <TouchableScale
                style={styles.inputButton}
                onPress={this.handleInputButtonPressed}
                activeScale={0.99}>
                    <PDText style={styles.inputButtonTitle}>Input { readingName }</PDText>
                </TouchableScale>
            : null;

        const caretOrNothing = this.props.isActive
            ? null
            : <Image style={styles.downCaret} source={require('../../assets/down_caret.png')} width={18} height={10}/>

        return (
            <View style={styles.container}>
                <TouchableHighlight
                    style={ styles.content }
                    underlayColor={'#FFFFFF'}
                    onPress={this.handleCellPressed}>
                    <View style={{flex:1}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Image
                                style={styles.circleImage} 
                                source={leftImageSource}
                                width={28} 
                                height={28}/>
                            <PDText style={styles.readingName}>{ readingName }</PDText>
                            {caretOrNothing}
                            {/*<PDText style={[styles.readingValue, styles.infoReadingValue]}>{ readingMessage } </PDText>*/}
                        </View>
                        {buttonOrNothing}
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        // height: 50,
        alignContent: 'stretch',
        borderRadius: 10
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.11,
        shadowRadius: 5,
        elevation: 2,
        marginBottom: 12,
        marginHorizontal: 16
    },
    circleImage: {
        margin: 10
    },
    downCaret: {
        marginTop: 21,
        marginRight: 19
    },
    readingName: {
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 48,
        flex: 1
    },
    readingValue: {
        color: 'white',
        justifyContent: 'center',
    },
    infoReadingValue: {
        color: 'grey'
    },
    inputButton: {
        backgroundColor: 'black',
        margin: 16,
        marginTop: 10,
        borderRadius: 10
    },
    inputButtonTitle: {
        color: 'white',
        lineHeight: 50,
        paddingVertical: 0,
        fontWeight: '700',
        fontSize: 24,
        alignContent: 'center',
        alignSelf: 'center'
    }
});