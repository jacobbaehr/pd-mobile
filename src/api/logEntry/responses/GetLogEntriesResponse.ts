import { LogEntry } from 'models/logs/LogEntry';

/** Response of GET request to /api/v1/pools/{poolId}/logs */
export interface GetLogEntriesResponse {
    list: LogEntry[];
}