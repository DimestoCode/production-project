import { createSelector } from "@reduxjs/toolkit";
import { getProfileData } from "entities/Profile";
import { getUserAuthData } from "entities/User";

export const getIsProfileFormEditable = createSelector(
    [getUserAuthData, getProfileData],
    (authData, profileData) => authData?.id === profileData?.id
);
