import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { TextButton } from '~/components/buttons/TextButton';
import BorderInputWithLabel from '~/components/inputs/BorderInputWithLabel';
import { PDText } from '~/components/PDText';
import { PDSpacing } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';
import { useRealmPoolTargetRange } from '~/hooks/RealmPoolHook';
import { Pool } from '~/models/Pool';
import { TargetRangeOverride } from '~/models/Pool/TargetRangeOverride';
import { TargetRange } from '~/models/recipe/TargetRange';
import { AppState } from '~/redux/AppState';
import { Database } from '~/repository/Database';

/**
 *  List Item for Custom Targets by Defaults values from each waterType.
 */
const CustomTargetsItem: React.FC<TargetRange> = (props) => {
    const { name, description, defaults } = props;
    const pool = useSelector<AppState>((state) => state.selectedPool) as Pool;
    const loadedCustomTarget = useRealmPoolTargetRange(pool.objectId, props.var) ?? ({} as TargetRangeOverride);
    const { control, handleSubmit, setValue, formState } = useForm<TargetRange>({
        defaultValues: props,
        mode: 'all',
    });
    const { isDirty } = formState;

    const hasErrors = Object.keys(formState.errors).length >= 1;

    const defaultMin = defaults[0]?.min ?? 0;
    const defaultMax = defaults[0]?.max ?? 0;

    const isOverrides = (key: 'min' | 'max') => Boolean(loadedCustomTarget[key]);

    const handleResetValue = () => {
        setValue('defaults', props.defaults);
    };

    const handleBlurred = handleSubmit(async (values) => {
        const mapDefaultCustomTargets = {
            objectId: loadedCustomTarget.objectId,
            min: props.defaults[0].min,
            max: props.defaults[0].max,
            poolId: pool.objectId,
            var: props.var,
        };

        const mapValuesCustomTargets = {
            min: values.defaults[0].min,
            max: values.defaults[0].max,
        };

        const mapCustomTarget = TargetRangeOverride.make(mapDefaultCustomTargets, mapValuesCustomTargets);

        await Database.saveNewCustomTarget(mapCustomTarget);
    });

    return (
        <PDView style={styles.container} bgColor="white">
            <PDView style={styles.topRow}>
                <PDText type="bodyMedium" color="black">
                    {name}
                </PDText>
                <TextButton
                    text="Reset"
                    onPress={handleResetValue}
                    disabled={!isDirty || isOverrides('min') || isOverrides('max')}
                    containerStyles={styles.buttonContainer}
                    textStyles={[styles.buttonText, isDirty && styles.activeButton]}
                />
            </PDView>
            <PDView>
                <PDView style={styles.inputRow}>
                    <Controller
                        control={control}
                        name="defaults[0].min"
                        render={({ value, onChange }) => (
                            <BorderInputWithLabel
                                label="min"
                                placeholder={
                                    isOverrides('min') ? loadedCustomTarget?.min.toString() : defaultMin.toString()
                                }
                                placeholderTextColor={isOverrides('min') ? '#1E6BFF' : '#BBBBBB'}
                                onChangeText={(text) => onChange({ target: { value: text } })}
                                value={value}
                                onBlur={handleBlurred}
                                keyboardType="numeric"
                                maxLength={3}
                            />
                        )}
                        rules={{
                            validate: (newMin) => newMin < defaultMax,
                        }}
                    />
                    <Controller
                        control={control}
                        name="defaults[0].max"
                        render={({ value, onChange }) => (
                            <BorderInputWithLabel
                                label="max"
                                placeholder={
                                    isOverrides('max') ? loadedCustomTarget?.max.toString() : defaultMax.toString()
                                }
                                placeholderTextColor={isOverrides('max') ? '#1E6BFF' : '#BBBBBB'}
                                onChangeText={onChange}
                                value={value}
                                onBlur={handleBlurred}
                                keyboardType="numeric"
                                maxLength={3}
                            />
                        )}
                        rules={{
                            validate: (newMax) => newMax > defaultMin,
                        }}
                    />
                </PDView>
                {hasErrors && (
                    <PDView bgColor="blurredRed" style={styles.errorContainer}>
                        <PDText type="bodyBold" color="red">
                            Your target’s min value cannot greater than the max value
                        </PDText>
                    </PDView>
                )}
                <PDView>
                    <PDText numberOfLines={3} type="bodyRegular" color="grey">
                        {description}
                    </PDText>
                </PDView>
            </PDView>
        </PDView>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#EDEDED',
        padding: PDSpacing.lg,
        marginBottom: PDSpacing.sm,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderColor: '#F5F5F5',
        marginBottom: PDSpacing.sm,
        paddingBottom: PDSpacing.sm,
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: PDSpacing.sm,
    },
    errorContainer: {
        borderRadius: 8,
        paddingVertical: PDSpacing.xs,
        paddingHorizontal: PDSpacing.sm,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: PDSpacing.sm,
    },
    buttonContainer: {
        borderRadius: 12.5,
        backgroundColor: '#00000004',
        minHeight: 34,
        minWidth: 75,
    },
    buttonText: {
        fontSize: 16,
        fontStyle: 'normal',
        color: '#7C7C7C',
    },
    activeButton: {
        color: '#000000',
    },
    isOverride: {
        color: '#1E6BFF',
    },
});

export default CustomTargetsItem;
