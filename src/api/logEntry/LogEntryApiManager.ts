import { AxiosError } from 'axios';

import { HttpRequestTypes, NetworkRequestResponse } from 'api/BaseApiManager';

import { GetLogEntriesResponse } from './responses/GetLogEntriesResponse';
import { GetLogEntriesRequest } from './requests/GetLogEntriesRequest';
import { AuthenticedApiManager } from 'api/AuthenticatedApiManager';

/**
 * API manager class used to send requests to Pool Dash API `/pool/{poolId}/logEntries` endpoint
 */
export class LogEntryApiManager extends AuthenticedApiManager {

    /**
     * Get all of the log entries for a given pool since a given date, where the date is optional
     */
    public async getLogEntriesForPool(poolId: string, date?: Date): Promise<NetworkRequestResponse<GetLogEntriesResponse>> {

        // const request: GetLogEntriesRequest = {
        //     pool_id: poolId
        // };
        // if (date) {
        //     request.ts = date.getTime();
        // }

        // return await this.makeRequest<GetLogEntriesResponse>(
        //     HttpRequestTypes.GET, 
        //     null,
        //     `/pools/${poolId}/logs`,
        //     request);
        return await this.req();
    }

    protected buildErrorFromAxioError(error: AxiosError) {
        return error;
    }
}