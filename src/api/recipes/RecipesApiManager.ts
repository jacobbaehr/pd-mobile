import { AxiosError } from 'axios';

import { BaseApiManager, HttpRequestTypes, NetworkRequestResponse } from '~/api/BaseApiManager';

import { GetRecipesResponse } from './responses/GetRecipesResponse';

/**
 * API manager class used to send requests to Pool Dash API `/recipes` endpoint
 */
export class RecipesApiManager extends BaseApiManager {
    /**
     * Get all of the default recipes
     */
    public async getDefaultRecipes(): Promise<NetworkRequestResponse<GetRecipesResponse>> {
        return await this.makeRequest<GetRecipesResponse>(HttpRequestTypes.GET);
    }

    protected buildErrorFromAxioError(error: AxiosError) {
        return error;
    }
}