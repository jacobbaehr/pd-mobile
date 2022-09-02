/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_register {
  __typename: "User";
  id: string;
}

export interface Login {
  register: Login_register | null;
}

export interface LoginVariables {
  usernameOrEmail: string;
  password: string;
}
