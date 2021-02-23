import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { TextButton } from '~/components/buttons/TextButton';
import { Card } from '~/components/Card';
import BorderInputWithLabel from '~/components/inputs/BorderInputWithLabel';
import { PDBox } from '~/components/PDBox';
import { PDText } from '~/components/PDText';
import { Pool } from '~/models/Pool';
import { TargetRangeOverride } from '~/models/Pool/TargetRangeOverride';
import { TargetRange } from '~/models/recipe/TargetRange';
import { AppState } from '~/redux/AppState';
import { Database } from '~/repository/Database';

import { useRealmPoolTargetRange } from '../poolList/hooks/RealmPoolHook';

/**
 *  List Item for Custom Targets by Defaults values fro each waterType.
 */
const CustomTargetsItem: React.FC<TargetRange> = (props) => {
    const { name, description, defaults } = props;
    const pool = useSelector<AppState>((state) => state.selectedPool) as Pool;
    const loadedCustomTarget = useRealmPoolTargetRange(pool.objectId, props.var) ?? ({} as TargetRangeOverride);
    const { control, handleSubmit, setValue, errors, formState } = useForm<TargetRange>({
        defaultValues: props,
        mode: 'all',
    });
    const { isDirty } = formState;

    const hasErrors = Object.keys(errors).length >= 1;

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
        <PDBox backgroundColor="white" borderRadius={24} borderWidth={2} borderColor="greyLight" p="lg" mb="sm">
            <PDBox
                flexDirection="row"
                justifyContent="space-between"
                borderBottomWidth={2}
                borderColor="greyLighter"
                marginBottom="sm"
                paddingBottom="sm">
                <PDText variant="bodyMedium" color="black">
                    {name}
                </PDText>
                <TextButton
                    text="Reset"
                    onPress={handleResetValue}
                    disabled={!isDirty || isOverrides('min') || isOverrides('max')}
                    containerStyles={styles.buttonContainer}
                    textStyles={[styles.buttonText, isDirty && styles.activeButton]}
                />
            </PDBox>
            <PDBox>
                <PDBox flexDirection="row" justifyContent="space-between" alignItems="center" mb="sm">
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
                                onChangeText={onChange}
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
                </PDBox>
                {hasErrors && (
                    <Card variant="default" backgroundColor="blurredRed" my="sm">
                        <PDText variant="bodyBold" color="red">
                            Your target’s min value cannot greater than the max value
                        </PDText>
                    </Card>
                )}
                <PDBox>
                    <PDText numberOfLines={3} variant="bodyRegular" color="grey">
                        {description}
                    </PDText>
                </PDBox>
            </PDBox>
        </PDBox>
    );
};

const styles = StyleSheet.create({
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
