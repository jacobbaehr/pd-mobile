import Axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export enum HttpRequestTypes {
    GET = 'get',
    PUT = 'put',
    POST = 'post',
    DELETE = 'delete'
}

export interface NetworkRequestResponse<ResponseType> {
    response?: AxiosResponse<ResponseType>;
    error?: AxiosError;
}

/**
 * Base API class used to configure requests to a specific URL
 */
export abstract class BaseApiManager {
    /** instance of axios object to send requests */
    protected axiosInstance: AxiosInstance;

    constructor(baseUrl: string) {
        this.axiosInstance = Axios.create({
            baseURL: baseUrl
        });
    }

    /**
     * Make API request with the given config
     * @param method type of request to send
     * @param endpoint endpoint of url to send request to
     * @param headers headers to add to request
     * @param urlParams query parameters for request
     * @param requestBody body of request
     */
    public async makeRequest<ResponseType>(
        method: HttpRequestTypes,
        headers: { [key: string]: string | number } = {},
        endpoint?: string,
        urlParams?: { [key: string]: any },
        requestBody?: { [key: string]: any }
    ): Promise<NetworkRequestResponse<ResponseType>> {
        try {
            const res = await this.axiosInstance.request<ResponseType>({
                method,
                url: endpoint,
                headers,
                params: urlParams,
                data: requestBody
            });
            return { response: res };
        } catch (e) {
            return { error: this.buildErrorFromAxioError(e) };
        }
    }

    /**
     * Converts axios error into more helpful error object
     * @param error axios error from network request
     */
    protected abstract buildErrorFromAxioError(error: AxiosError): AxiosError;
}