import { LogEntry } from "~/models/logs/LogEntry";
import { Pool } from "~/models/Pool";
import { Database } from "~/repository/Database";
import { TempCsvRepo } from "~/repository/TempCsvRepo";
import { Util } from "./Util";

export namespace DataService {
    /// Returns the filepath of the csv file
    export const generateCsvFileForAllPools = async (): Promise<string> => {
        let dataString = 'pool_dash,export\n';

        dataString += Database.loadPools()
            .map(pool => generateCSVEntriesForPool(pool))
            .join('\n**************\n');

        const filePath = await TempCsvRepo.saveCSV(dataString);
        return filePath;
    }

    export const generateCsvFileForPool = async (pool: Pool): Promise<string> => {
        let dataString = 'pool_dash,export\n';

        dataString += generateCSVEntriesForPool(pool);

        const filePath = await TempCsvRepo.saveCSV(dataString);
        return filePath;
    }

    const generateCSVEntriesForPool = (pool: Pool): string => {
        let result = `\npool,\
            ${pool.name},\
            ${pool.gallons},\
            gallons,\
            ${Util.gallonsToLiters(pool.gallons)},\
            liters,\
            ${pool.waterType},\
            ${pool.wallType},\
            ${pool.recipeKey ?? ''},\
            ${pool.objectId}`;
        const logs = Database.loadLogEntriesForPool(pool.objectId, null, true);
        logs.forEach(entry => {
            result += `${getRowsForEntry(entry)}\n`
        });
        return result;
    }

    const getRowsForEntry = (logEntry: LogEntry): string => {
        let result = `\nlog_entry,\
            ${(new Date(logEntry.ts)).toISOString()},\
            ${logEntry.notes ?? '---'},\
            ${logEntry.recipeKey},\
            ${logEntry.objectId}`;
        logEntry.readingEntries.forEach(re => {
            result += `\nreading,\
                ${re.readingName},\
                ${re.var},\
                ${re.value},\
                ${re.units ?? ''}`;
        });
        logEntry.treatmentEntries.forEach(te => {
            result += `\ntreatment,\
                ${Util.getDisplayNameForTreatment({ name: te.treatmentName, concentration: te.concentration })},\
                ${te.var},\
                ${te.displayAmount},\
                ${te.displayUnits ?? ''},\
                ${te.ounces},\
                ounces`;
        });
        return result;
    }
}
