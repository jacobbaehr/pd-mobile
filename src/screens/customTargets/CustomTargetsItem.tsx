import React, { useCallback } from 'react';
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
import { Util } from '~/services/Util';

import { TargetsHelper } from './TargetHelper';

interface CustomTargetsItemProps {
    tr: TargetRange;
}

interface TargetFormFields {
    min: string;
    max: string;
}

/**
 *  List Item for Custom Targets by Defaults values from each wallType.
 */
const CustomTargetsItem: React.FC<CustomTargetsItemProps> = ({ tr }) => {
    const pool = useSelector<AppState>((state) => state.selectedPool) as Pool;
    const locallySavedOverride = useRealmPoolTargetRange(pool.objectId, tr.var); // ?? ({} as TargetRangeOverride);

    // The min & max will sometimes be equal to the defaults, but we need to determine both for the sake of comparison
    const recipeDefaults = TargetsHelper.resolveMinMax(tr, pool.wallType, null);
    const { min, max } = TargetsHelper.resolveMinMax(tr, pool.wallType, locallySavedOverride);

    // We use empty-strings for defaults (to show the placeholder)
    const [formValues, setFormValues] = React.useState<TargetFormFields>({
        min: min === recipeDefaults.min ? '' : `${min}`,
        max: max === recipeDefaults.max ? '' : `${max}`,
    });

    // Check for errors:
    const effectiveMinValue = formValues.min.length ? +formValues.min : recipeDefaults.min;
    const effectiveMaxValue = formValues.max.length ? +formValues.max : recipeDefaults.max;
    const isValid = effectiveMaxValue >= effectiveMinValue;

    const isDefault = (field: 'min' | 'max'): Boolean => {
        if (field === 'min') {
            return recipeDefaults.min === min;
        }
        return recipeDefaults.max === max;
    };

    const reset = () => {
        if (locallySavedOverride) {
            Database.deleteCustomTarget(locallySavedOverride);
        }
        setFormValues({ min: '', max: '' });
    };

    const save = async () => {
        // If these are the default values, just delete them:
        if (recipeDefaults.max === +formValues.max && recipeDefaults.min === +formValues.min) {
            reset();
            return;
        }

        const newLocalOverride = {
            objectId: locallySavedOverride?.objectId ?? null, /// If this is null, the DB should create a new object
            min: formValues.min.length ? +formValues.min : recipeDefaults.min,
            max: formValues.max.length ? +formValues.max : recipeDefaults.max,
            poolId: pool.objectId,
            var: tr.var,
        };

        const mapCustomTarget = TargetRangeOverride.make(newLocalOverride);
        await Database.saveNewCustomTarget(mapCustomTarget);
    };

    const handleTextChange = useCallback(
        (fieldName: 'min' | 'max', newValue: string) => {
            const newFormValues = Util.deepCopy(formValues);
            newFormValues[fieldName] = newValue;
            setFormValues(newFormValues);
        },
        [formValues]
    );

    const handleBlur = () => {
        if (isValid) {
            save();
        }
    };

    const enableResetButton = !isDefault('min') || !isDefault('max');

    return (
        <PDView style={ styles.container } bgColor="white">
            <PDView style={ styles.topRow }>
                <PDText type="bodyMedium" color="black">
                    {tr.name}
                </PDText>
                <TextButton
                    text="Reset"
                    onPress={ reset }
                    disabled={ !enableResetButton }
                    containerStyles={ styles.buttonContainer }
                    textStyles={ [styles.buttonText, enableResetButton && styles.activeButton] }
                />
            </PDView>
            <PDView>
                <PDView style={ styles.inputRow }>
                    <BorderInputWithLabel
                        label="min"
                        placeholder={ `${recipeDefaults.min}` }
                        placeholderTextColor={ '#BBBBBB' }
                        onChangeText={ (text) => handleTextChange('min', text) }
                        value={ formValues.min }
                        keyboardType="numeric"
                        onBlur={ handleBlur }
                    />
                    <BorderInputWithLabel
                        label="max"
                        placeholder={ `${recipeDefaults.max}` }
                        placeholderTextColor={ '#BBBBBB' }
                        onChangeText={ (text) => handleTextChange('max', text) }
                        value={ formValues.max }
                        keyboardType="numeric"
                        onBlur={ handleBlur }
                    />
                </PDView>
                {!isValid && (
                    <PDView bgColor="blurredRed" style={ styles.errorContainer }>
                        <PDText type="bodyBold" color="red">
                            Your target’s min value cannot greater than the max value
                        </PDText>
                    </PDView>
                )}
                <PDView>
                    <PDText numberOfLines={ 3 } type="bodyRegular" color="grey">
                        {tr.description}
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
