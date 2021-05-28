import { format } from 'date-fns';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { SVG } from '~/assets/images';
import { PDButtonSolid } from '~/components/buttons/PDButtonSolid';
import { PDText } from '~/components/PDText';
import { PDSpacing, useTheme } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';
import { LogEntry } from '~/models/logs/LogEntry';
import { ReadingEntry } from '~/models/logs/ReadingEntry';
import { TreatmentEntry } from '~/models/logs/TreatmentEntry';
import { Util } from '~/services/Util';

interface PoolHistoryListItemProps {
    logEntry: LogEntry;
    isExpanded: boolean;
    handleCellSelected: (id: string) => void;
    handleDeletePressed: (id: string) => void;
    handleEmailPressed: (logEntry: LogEntry) => void;
}

const ReadingRow: React.FC<{ re: ReadingEntry }> = (props) => {
    const { re } = props;
    const theme = useTheme();
    return (
        <PDView style={ styles.rowItemContainer }>
            <SVG.IconCircleCheckmark width={ 16 } height={ 16 } fill={ theme.green } />
            <PDText type="bodyRegular" style={ styles.lineItem }>
                {re.readingName}: {re.value} {re.units}
            </PDText>
        </PDView>
    );
};

const TreatmentRow: React.FC<{ te: TreatmentEntry }> = (props) => {
    const { te } = props;
    let name = te.treatmentName;
    if (te.concentration && te.concentration !== 100) {
        name = `${te.concentration.toFixed(0)}% ${name}`;
    }
    let content = '';
    switch (te.type) {
        case 'dryChemical':
        case 'liquidChemical':
        case 'calculation':
            content = `${name}: ${Util.removeSuffixIfPresent('.0', te.displayAmount)} ${te.displayUnits}`;
            break;
        case 'task':
            content = `${name}`;
            break;
    }

    return (
        <PDView style={ styles.rowItemContainer } >
            <SVG.IconCircleAddSolid width={ 16 } height={ 16 } />
            <PDText type="bodyRegular" style={ styles.lineItem }>
                {content}
            </PDText>
        </PDView>
    );
};

export const PoolHistoryListItem: React.FunctionComponent<PoolHistoryListItemProps> = (props) => {
    const dayOfWeek = format(props.logEntry.ts, 'cccc');
    const boringDate = format(props.logEntry.ts, 'MMM d, y') + format(props.logEntry.ts, '  //  h:mma').toLowerCase();
    const recipeName = props.logEntry.recipeKey;
    const theme = useTheme();

    let expandedContent: JSX.Element[] = [];
    if (props.isExpanded) {
        const readings = props.logEntry.readingEntries.map((re) => (
            <ReadingRow key={ 'r' + re.var + props.logEntry.objectId } re={ re } />
        ));

        const treatments = props.logEntry.treatmentEntries.map((te) => (
            <TreatmentRow key={ 't' + te.var + props.logEntry.objectId } te={ te } />
        ));

        expandedContent = [
            <PDView style={ { borderWidth: 1, borderColor: theme.border, marginTop: PDSpacing.xs } } />,
            <PDView style={ styles.sectionContainer } key={ '9o8asd87' + props.logEntry.objectId }>
                <PDText type="buttonSmall" color="grey" >
                    Formula
                </PDText>
                <PDView style={ styles.rowItemContainer }>
                    <SVG.IconFormulaV2 width={ 16 } height={ 16 } />
                    <PDText type="bodyRegular" color="black" style={ styles.lineItem }>
                        {recipeName}
                    </PDText>
                </PDView>
            </PDView>,
            <PDView  style={ styles.sectionContainer } key={ '9o8asd89' + props.logEntry.objectId }>
                <PDText type="buttonSmall" color="grey">
                    Readings
                </PDText>
                {readings}
            </PDView>,
            <PDView style={ styles.sectionContainer } key={ '9o8asd88' + props.logEntry.objectId }>
                <PDText  type="buttonSmall" color="grey" >
                    Treatments
                </PDText>
                {treatments}
            </PDView>,
            <View style={ styles.buttonRow } key={ recipeName + props.logEntry.objectId + 'afsd98' }>
                <PDButtonSolid
                    bgColor="greyLight"
                    textColor="black"
                    onPress={ () => props.handleEmailPressed(props.logEntry) }
                    icon={ <SVG.IconMail fill="black" /> }>
                    Email
                </PDButtonSolid>
                <PDButtonSolid
                    bgColor="red"
                    onPress={ () => props.handleDeletePressed(props.logEntry.objectId) }
                    icon={ <SVG.IconDeleteOutline fill={ theme.white } /> }>
                    Delete
                </PDButtonSolid>
            </View>,
        ];
    }

    const handleButtonPressed = () => {
        props.handleCellSelected(props.logEntry.objectId);
    };

    const Icon = props.isExpanded ? SVG.IconChevronCircleUp : SVG.IconChevronCircleDown;
    return (
        <TouchableScale style={ styles.container } onPress={ handleButtonPressed } activeScale={ 0.99 }>
            <PDView style={ styles.rowContainer }>
                <PDView>
                    <PDText type="bodyMedium" color="greyDarker">
                        {dayOfWeek}
                    </PDText>
                    <PDText type="bodyRegular" color="grey">
                        {boringDate}
                    </PDText>
                </PDView>
                <PDView>
                    <Icon />
                </PDView>
            </PDView>
            {expandedContent}
        </TouchableScale>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#F0F0F0',
        paddingHorizontal: PDSpacing.lg,
        paddingVertical: PDSpacing.md,
        marginBottom: PDSpacing.xs,
    },
    readingRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionContainer: {
        marginVertical: PDSpacing.xs,
    },
    header: {
        fontSize: 16,
        fontWeight: '600',
        opacity: 0.6,
        marginTop: 12,
    },
    lineItem: {
        marginLeft: PDSpacing.xs,
        fontWeight: '500',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: PDSpacing.md,
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
        paddingHorizontal: 25,
    },
    emailButtonContainer: {
        backgroundColor: '#DFE6F7',
        marginVertical: 12,
        shadowColor: 'transparent',
        height: 50,
        padding: 5,
        paddingHorizontal: 25,
    },
    emailButtonText: {
        color: '#1E6BFF',
    },
    rowItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
