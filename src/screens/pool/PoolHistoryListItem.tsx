import React from 'react';
import { StyleSheet, View } from 'react-native';
import { format } from 'date-fns';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';

import { LogEntry } from '~/models/logs/LogEntry';
import { PDText } from '~/components/PDText';
import { Util } from '~/services/Util';
import { BoringButton } from '~/components/buttons/BoringButton';

interface PoolHistoryListItemProps {
    logEntry: LogEntry;
    isExpanded: boolean;
    handleCellSelected: (id: string) => void;
    handleDeletePressed: (id: string) => void;
}

export const PoolHistoryListItem: React.FunctionComponent<PoolHistoryListItemProps> = (props) => {
    const dayOfWeek = format(props.logEntry.ts, 'cccc');
    const boringDate = format(props.logEntry.ts, 'MMM d, y') + format(props.logEntry.ts, '  //  h:mma').toLowerCase();
    const recipeName = props.logEntry.recipeKey;

    let expandedContent: JSX.Element[] = [];
    if (props.isExpanded) {
        const readings = props.logEntry.readingEntries.map(re => (
            <PDText style={ styles.lineItem } key={ re.var + props.logEntry.objectId }>• { re.readingName }: {re.value } { re.units }</PDText>
        ));

        const treatments = props.logEntry.treatmentEntries.map(te => {
            let name = te.treatmentName;
            if (te.concentration && te.concentration !== 100) {
                name = `${te.concentration.toFixed(0)}% ${name}`;
            }
            let content = '';
            switch (te.type) {
                case 'dryChemical':
                case 'liquidChemical':
                case 'calculation':
                    content = `• ${name}: ${Util.removeSuffixIfPresent('.0', te.displayAmount)} ${te.displayUnits}`;
                    break;
                case 'task':
                    content = `• ${name}`;
                    break;
            }

            return <PDText
                style={ styles.lineItem }
                key={ te.var + props.logEntry.objectId }>

                { content }
            </PDText>
        });

        let notes = [<></>];
        if (props.logEntry.notes) {
            notes = [
                <PDText style={ styles.header } key={ '9o8as8766++' + props.logEntry.objectId }>Notes</PDText>,
                <PDText style={ styles.lineItem } key={ '9o8as8766++++' + props.logEntry.objectId }>{ props.logEntry.notes }</PDText>
            ];
        }

        expandedContent = [
            <PDText style={ styles.header } key={ '9o8asd89' + props.logEntry.objectId }>Readings</PDText>,
            ...readings,
            <PDText style={ styles.header } key={ '9o8asd88' + props.logEntry.objectId }>Treatments</PDText>,
            ...treatments,
            ...notes,
            <PDText style={ styles.header } key={ '9o8asd87' + props.logEntry.objectId }>Recipe|Version</PDText>,
            <PDText style={ styles.lineItem } key={ recipeName + props.logEntry.objectId }>• { recipeName }</PDText>,
            <View style={ styles.buttonRow } key={ recipeName + props.logEntry.objectId + 'afsd98' }>
                <View style={ styles.buttonRowColumn } >
                    <BoringButton
                        containerStyles={ styles.deleteButtonContainer }
                        textStyles={ styles.deleteButtonText }
                        title="Delete"
                        onPress={ () => props.handleDeletePressed(props.logEntry.objectId) } />
                </View>
                <View style={ styles.buttonRowColumn } >

                </View>
            </View>
        ];
    }
    console.log('Reading Entries: ', JSON.stringify(props.logEntry.readingEntries));
    console.log('Treatment Entries: ', JSON.stringify(props.logEntry.treatmentEntries));

    const handleButtonPressed = () => {
        props.handleCellSelected(props.logEntry.objectId);
    };
    return (
        <TouchableScale style={ styles.container }
            onPress={ handleButtonPressed }
            underlayColor={ 'transparent' }
            activeScale={ 0.99 }>

            <PDText style={ styles.weekday } >{ dayOfWeek }</PDText>
            <PDText style={ styles.date } >{ boringDate }</PDText>
            { expandedContent }
        </TouchableScale>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 12,
        backgroundColor: 'white',
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#F0F0F0',
        paddingHorizontal: 22,
        paddingVertical: 12
    },
    weekday: {
        fontSize: 22,
        fontWeight: '700'
    },
    date: {
        fontSize: 16,
        opacity: .6,
        fontWeight: '600'
    },
    header: {
        fontSize: 16,
        fontWeight: '600',
        opacity: .6,
        marginTop: 12
    },
    lineItem: {
        fontSize: 18,
        fontWeight: '600'
    },
    buttonRow: {
        flexDirection: 'row'
    },
    buttonRowColumn: {
        flex: 1
    },
    deleteButtonContainer: {
        backgroundColor: '#FFF4F3',
        marginVertical: 12,
        shadowColor: 'transparent',
        height: 40
    },
    deleteButtonText: {
        color: '#FB2315',
        padding: 0
    }
});