import { createSelector } from "@reduxjs/toolkit";
import { IStoreState } from "@/app/providers/StoreProvider";
import { UserRole } from "../consts/consts";
import { buildSelector } from "@/shared/lib/store/buildSelector";

export const [useUserRoles, userRolesSelector] = buildSelector((state: IStoreState) => state.user.authData?.roles);

export const isRoleAdmin = createSelector(userRolesSelector, (roles) => roles?.includes(UserRole.Admin));

export const isRoleUser = createSelector(userRolesSelector, (roles) => roles?.includes(UserRole.User));
export const isRoleManager = createSelector(userRolesSelector, (roles) => roles?.includes(UserRole.Manager));
