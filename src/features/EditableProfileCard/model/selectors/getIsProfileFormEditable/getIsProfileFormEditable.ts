import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "entities/User";
import { getProfileData } from "../getProfileData/getProfileData";

export const getIsProfileFormEditable = createSelector(
    [getUserAuthData, getProfileData],
    (authData, profileData) => authData?.id === profileData?.id
);
