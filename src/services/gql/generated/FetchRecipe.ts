/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchRecipe
// ====================================================

export interface FetchRecipe_recipeVersion_readings {
    __typename: 'Reading';
    name: string;
    var: string;
    sliderMin: number | null;
    sliderMax: number | null;
    idealMin: number | null;
    idealMax: number | null;
    type: string;
    decimalPlaces: number | null;
    units: string | null;
    defaultValue: number;
}

export interface FetchRecipe_recipeVersion_treatments {
    __typename: 'Treatment';
    name: string;
    var: string;
    formula: string;
    type: string;
    concentration: number;
}

export interface FetchRecipe_recipeVersion_custom_defaults {
    __typename: 'DefaultRange';
    waterType: string | null;
    min: number;
    max: number;
}

export interface FetchRecipe_recipeVersion_custom {
    __typename: 'TargetRange';
    name: string;
    var: string;
    description: string | null;
    defaults: FetchRecipe_recipeVersion_custom_defaults[];
}

export interface FetchRecipe_recipeVersion {
    __typename: 'Recipe';
    id: string;
    author_id: string;
    author_username: string;
    name: string;
    description: string;
    ts: number;
    appVersion: string;
    readings: FetchRecipe_recipeVersion_readings[];
    treatments: FetchRecipe_recipeVersion_treatments[];
    custom: FetchRecipe_recipeVersion_custom[];
}

export interface FetchRecipe {
    recipeVersion: FetchRecipe_recipeVersion;
}

export interface FetchRecipeVariables {
    id: string;
    ts: number;
}
