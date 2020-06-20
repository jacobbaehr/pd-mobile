/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ListRecipes
// ====================================================

export interface ListRecipes_listRecipes {
  __typename: "RecipeMeta";
  id: string;
  name: string;
  desc: string;
  ts: number;
}

export interface ListRecipes {
  listRecipes: ListRecipes_listRecipes[];
}
