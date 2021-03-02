import { format } from 'date-fns';
import React from 'react';
import { StyleSheet, View } from 'react-native';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';
import { BoringButton } from '~/components/buttons/BoringButton';
import { PDText } from '~/components/PDText';
import { LogEntry } from '~/models/logs/LogEntry';
import { Util } from '~/services/Util';

interface PoolHistoryListItemProps {
    logEntry: LogEntry;
    isExpanded: boolean;
    handleCellSelected: (id: string) => void;
    handleDeletePressed: (id: string) => void;
    handleEmailPressed: (logEntry: LogEntry) => void;
}

export const PoolHistoryListItem: React.FunctionComponent<PoolHistoryListItemProps> = (props) => {
    const dayOfWeek = format(props.logEntry.ts, 'cccc');
    const boringDate = format(props.logEntry.ts, 'MMM d, y') + format(props.logEntry.ts, '  //  h:mma').toLowerCase();
    const recipeName = props.logEntry.recipeKey;

    let expandedContent: JSX.Element[] = [];
    if (props.isExpanded) {
        const readings = props.logEntry.readingEntries.map((re) => (
            <PDText type="default" style={styles.lineItem} key={'r' + re.var + props.logEntry.objectId}>
                • {re.readingName}: {re.value} {re.units}
            </PDText>
        ));

        const treatments = props.logEntry.treatmentEntries.map((te) => {
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

            return (
                <PDText type="default" style={styles.lineItem} key={'t' + te.var + props.logEntry.objectId}>
                    {content}
                </PDText>
            );
        });

        let notes = [<></>];
        if (props.logEntry.notes) {
            notes = [
                <PDText type="default" style={styles.header} key={'9o8as8766++' + props.logEntry.objectId}>
                    Notes
                </PDText>,
                <PDText type="default" style={styles.lineItem} key={'9o8as8766++++' + props.logEntry.objectId}>
                    {props.logEntry.notes}
                </PDText>,
            ];
        }

        expandedContent = [
            <PDText type="default" style={styles.header} key={'9o8asd89' + props.logEntry.objectId}>
                Readings
            </PDText>,
            ...readings,
            <PDText type="default" style={styles.header} key={'9o8asd88' + props.logEntry.objectId}>
                Treatments
            </PDText>,
            ...treatments,
            ...notes,
            <PDText type="default" style={styles.header} key={'9o8asd87' + props.logEntry.objectId}>
                Recipe|Version
            </PDText>,
            <PDText type="default" style={styles.lineItem} key={recipeName + props.logEntry.objectId}>
                • {recipeName}
            </PDText>,
            <View style={styles.buttonRow} key={recipeName + props.logEntry.objectId + 'afsd98'}>
                <BoringButton
                    containerStyles={styles.deleteButtonContainer}
                    textStyles={styles.deleteButtonText}
                    title="Delete"
                    onPress={() => props.handleDeletePressed(props.logEntry.objectId)}
                />
                <BoringButton
                    containerStyles={styles.emailButtonContainer}
                    textStyles={styles.emailButtonText}
                    title="Email"
                    onPress={() => props.handleEmailPressed(props.logEntry)}
                />

                <View />
            </View>,
        ];
    }

    const handleButtonPressed = () => {
        props.handleCellSelected(props.logEntry.objectId);
    };
    return (
        <TouchableScale style={styles.container} onPress={handleButtonPressed} activeScale={0.99}>
            <PDText type="default" style={styles.weekday}>
                {dayOfWeek}
            </PDText>
            <PDText type="default" style={styles.date}>
                {boringDate}
            </PDText>
            {expandedContent}
        </TouchableScale>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 12,
        backgroundColor: 'white',
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#F0F0F0',
        paddingHorizontal: 22,
        paddingVertical: 12,
    },
    weekday: {
        fontSize: 22,
        fontWeight: '700',
    },
    date: {
        fontSize: 16,
        opacity: 0.6,
        fontWeight: '600',
    },
    header: {
        fontSize: 16,
        fontWeight: '600',
        opacity: 0.6,
        marginTop: 12,
    },
    lineItem: {
        fontSize: 18,
        fontWeight: '600',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    deleteButtonContainer: {
        backgroundColor: '#FFF4F3',
        marginVertical: 12,
        shadowColor: 'transparent',
        height: 50,
    },
    deleteButtonText: {
        color: '#FB2315',
        padding: 5,
        paddingHorizontal: 10,
    },
    emailButtonContainer: {
        backgroundColor: '#DFE6F7',
        marginVertical: 12,
        shadowColor: 'transparent',
        height: 50,
    },
    emailButtonText: {
        color: '#1E6BFF',
        padding: 5,
        paddingHorizontal: 10,
    },
});
