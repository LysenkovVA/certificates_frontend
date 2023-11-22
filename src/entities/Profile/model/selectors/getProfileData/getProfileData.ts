import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";

export const getProfileData = createSelector(
    (state: StateSchema) => state?.profileSchema?.profileData ?? {},
    (data) => data,
);

export const getProfileDataSurname = (state: StateSchema) =>
    state?.profileSchema?.profileData?.surname ?? "";

export const getProfileDataName = (state: StateSchema) =>
    state?.profileSchema?.profileData?.name ?? "";

export const getProfileDataBirthDate = (state: StateSchema) =>
    state?.profileSchema?.profileData?.birthDate ?? "";

export const getProfileDataAvatar = (state: StateSchema) =>
    state?.profileSchema?.profileData?.avatar ?? "";

export const getProfileDataUserEmail = (state: StateSchema) =>
    state?.profileSchema?.profileData?.user?.email ?? "";
