/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchLatestRecipeMeta
// ====================================================

export interface FetchLatestRecipeMeta_latestPublishedMeta {
    __typename: 'RecipeMeta';
    ts: number;
}

export interface FetchLatestRecipeMeta {
    latestPublishedMeta: FetchLatestRecipeMeta_latestPublishedMeta;
}

export interface FetchLatestRecipeMetaVariables {
    id: string;
}
