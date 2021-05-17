import { LogEntry } from '~/models/logs/LogEntry';
import { Pool } from '~/models/Pool';
import { TargetRangeOverride } from '~/models/Pool/TargetRangeOverride';

import { Util } from './Util';

// Every time wee add a property to whatever class you will need to those arrays.
const PoolProps = ['name', 'gallons', 'waterType', 'wallType', 'objectId', 'recipeKey', 'newPool'];
const LogEntryProps = ['objectId', 'poolId', 'ts', 'readingEntries', 'treatmentEntries', 'recipeKey', 'notes'];
const TargetRangeProps = ['objectId', 'poolId', 'var', 'min', 'max'];

/**
 * if you need to parser, cast or convert any data form realm, you should use in this util class.
 */
export class RealmUtil {
    /**
     *  Parser Pool RealmObject to POJO
     * @param rawPools RealmCollection<Pool>
     * @returns array plain pool
     */
    static poolToPojo = (rawPools: Realm.Collection<Pool>) => {
        const parserData = Util.toArrayPojo<Pool>(PoolProps, rawPools);
        return parserData;
    };

    /**
     *  Parser LogEntry RealmObject to POJO
     * @param rawLogEntry RealmCollection<LogEntry>
     * @returns array plain LogEntry
     */
    static logEntryToPojo = (rawLogEntry: Realm.Collection<LogEntry>) => {
        const parserData = Util.toArrayPojo<LogEntry>(LogEntryProps, rawLogEntry);
        return parserData;
    };

    /**
     *  Parser Custom Target RealmObject to POJO
     * @param rawCustomTargers RealmCollection<TargetRangeOverride>
     * @returns array plain custom target
     */
    static customTargetToPojo = (rawCustomTargers: Realm.Collection<TargetRangeOverride>) => {
        const parserData = Util.toArrayPojo<TargetRangeOverride>(TargetRangeProps, rawCustomTargers);
        return parserData;
    };
}
