import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { TextButton } from '~/components/buttons/TextButton';
import { Card } from '~/components/Card';
import BorderInputWithLabel from '~/components/inputs/BorderInputWithLabel';
import { PDBox } from '~/components/PDBox';
import { PDText } from '~/components/PDText';
import { CustomTarget } from '~/models/recipe/CustomTarget';

/**
 *  List Item for Custom Targets by Defaults values fro each waterType.
 */
const CustomTargetsItem: React.FC<CustomTarget> = (props) => {
    const { name, description, defaults } = props;
    const { control, handleSubmit, setValue, errors, formState } = useForm<CustomTarget>({
        defaultValues: props,
        mode: 'all',
    });
    const { isDirty } = formState;
    const hasErrors = Object.keys(errors).length >= 1;

    const defaultMin = defaults[0]?.min ?? 0;
    const defaultMax = defaults[0]?.max ?? 0;

    const handleResetValue = () => {
        setValue('defaults', props.defaults);
    };

    const handleBlurred = handleSubmit(() => {});

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
                    disabled={!isDirty}
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
                                placeholder={defaultMin.toString()}
                                onChangeText={onChange}
                                value={value}
                                onBlur={handleBlurred}
                                keyboardType="numeric"
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
                                placeholder={defaultMax.toString()}
                                onChangeText={onChange}
                                value={value}
                                onBlur={handleBlurred}
                                keyboardType="numeric"
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
});

export default CustomTargetsItem;
