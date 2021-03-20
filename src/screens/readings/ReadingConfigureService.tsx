import React from 'react';
import { StyleSheet } from 'react-native';
import { SVG } from '~/assets/images';
import { PDProgressBar } from '~/components/PDProgressBar';
import { PDText } from '~/components/PDText';
import { lightTheme, PDSpacing, useTheme } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';
import { Pool } from '~/models/Pool';
import { getDisplayForWaterType } from '~/models/Pool/WaterType';
import { useTypedSelector } from '~/redux/AppState';
import { Util } from '~/services/Util';

interface ReadingConfigureServiceProps {
    completedLength: number;
    missingLength: number;
}

export const ReadingConfigureService: React.FC<ReadingConfigureServiceProps> = (props) => {
    const { completedLength, missingLength } = props;
    const theme = useTheme();
    const pool = useTypedSelector((state) => state.selectedPool) as Pool;
    const deviceSettings = useTypedSelector((state) => state.deviceSettings);
    const progress = missingLength === 0 ? 1 : completedLength / missingLength;
    // const percentText = `${(this.props.percentComplete * 100).toFixed(0)}% Complete`;
    const volumeDisplay = Util.getDisplayVolume(pool.gallons, deviceSettings);
    const detailsText = getDisplayForWaterType(pool.waterType);

    return (
        <PDView style={styles.container} bgColor="white">
            <PDText type="subHeading">{pool.name}</PDText>
            <PDView style={styles.row}>
                <PDView style={styles.containerIcon}>
                    <SVG.IconInformation fill={theme.grey} />
                </PDView>
                <PDText type="bodyRegular" color="grey">
                    {volumeDisplay}, {detailsText}
                </PDText>
            </PDView>
            <PDView>
                <PDText type="bodyBold" color="grey" style={styles.stepsText}>
                    {completedLength} of {missingLength} readings completed
                </PDText>
                <PDProgressBar
                    progress={progress}
                    foregroundColor={theme.blue}
                    style={{ height: 4, backgroundColor: 'rgba(0,0,0,0.2)' }}
                />
            </PDView>
        </PDView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: -PDSpacing.md,
        paddingTop: PDSpacing.lg,
        paddingHorizontal: PDSpacing.md,
        paddingBottom: PDSpacing.md,
        borderBottomColor: lightTheme.greyLight,
        borderBottomWidth: 2,
        marginBottom: PDSpacing.md,
    },
    containerIcon: {
        paddingRight: PDSpacing.xs,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: PDSpacing.xs,
    },
    stepsText: {
        textTransform: 'uppercase',
        marginBottom: PDSpacing.xs,
    },
});
