import { createSelector } from "@reduxjs/toolkit";
import { IStoreState } from "@/app/providers/StoreProvider";
import { UserRole } from "../consts/consts";

export const getUserRoles = (state: IStoreState) => state.user.authData?.roles;

export const isRoleAdmin = createSelector(getUserRoles, (roles) => roles?.includes(UserRole.Admin));

export const isRoleUser = createSelector(getUserRoles, (roles) => roles?.includes(UserRole.User));
export const isRoleManager = createSelector(getUserRoles, (roles) => roles?.includes(UserRole.Manager));
