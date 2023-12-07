import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";

export const getProfileData = createSelector(
    (state: StateSchema) => state?.profileSchema?.profileData ?? {},
    (data) => data,
);

export const getProfileFormData = createSelector(
    (state: StateSchema) => state?.profileSchema?.profileFormData ?? {},
    (data) => data,
);

export const getProfileDataAvatar = (state: StateSchema) =>
    state?.profileSchema?.profileDataAvatar ?? "";

export const getProfileFormDataAvatar = (state: StateSchema) =>
    state?.profileSchema?.profileFormDataAvatar ?? "";

export const getProfileDataError = (state: StateSchema) =>
    state?.profileSchema?.dataError ?? "";

export const getProfileDataIsLoading = (state: StateSchema) =>
    state?.profileSchema?.isDataLoading ?? false;

export const getProfileDataAvatarError = (state: StateSchema) =>
    state?.profileSchema?.avatarError ?? "";

export const getProfileDataAvatarIsLoading = (state: StateSchema) =>
    state?.profileSchema?.isAvatarLoading ?? false;

export const getProfileDataInitialized = (state: StateSchema) =>
    state?.profileSchema?._isDataInitialized ?? false;

export const getProfileDataAvatarInitialized = (state: StateSchema) =>
    state?.profileSchema?._isAvatarInitialized ?? false;
