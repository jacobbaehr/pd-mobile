/** Structure of GET request to /v1/pools/{poolId}/logs */
export interface GetLogEntriesRequest {
    /// The id of the pool to get the entries for
    pool_id: string;
    /// The epoch timestamp of the last known entry for the pool (blank if none)
    ts?: number;
}
