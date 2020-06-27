import { Recipe } from "~/models/recipe/Recipe";
import { Treatment } from "~/models/recipe/Treatment";
import { DeviceSettings } from "~/models/DeviceSettings";
import { DeviceSettingsService } from "~/services/DeviceSettingsService";
import { Util } from "~/services/Util";
import { Units } from "./TreatmentUnits";

export interface TreatmentState {
    treatment: Treatment;
    value?: string;
    ounces: number;
    isOn: boolean;
    units: Units;
    decimalPlaces: number;
    concentration: number;
}

export class TreatmentListHelpers {
    static getTreatmentFromRecipe = (treatmentVarName: string, recipe: Recipe): Treatment | null => {
        for (let i = 0; i < recipe.treatments.length; i++) {
            const t = recipe.treatments[i];
            if (t.var === treatmentVarName) {
                return t;
            }
        }
        return null;
    }

    static getConcentrationForTreatment = (varName: string, ds: DeviceSettings | null): number | null => {
        return ds?.treatments.concentrations[varName] || null;
    }

    static persistDeviceSettingsAsync = (ds: DeviceSettings) => {
        const persistConcentrationOverride = async () => {
            await DeviceSettingsService.saveSettings(ds);
        };
        persistConcentrationOverride();
    }

    // Returns true if an update occured, false otherwise
    static updateTreatmentState = (
        varName: string,
        modification: (ts: TreatmentState) => boolean,
        treatmentStates: TreatmentState[],
        setTreatmentState: React.Dispatch<React.SetStateAction<TreatmentState[]>>): boolean => {

        const tss = Util.deepCopy(treatmentStates);
        let didChange = false;
        tss.forEach((ts) => {
            if (ts.treatment.var === varName) {
                didChange = modification(ts);
            }
        });
        if (didChange) {
            setTreatmentState(tss);
        }
        return didChange;
    }
}