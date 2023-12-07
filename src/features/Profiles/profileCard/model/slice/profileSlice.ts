import { Profile } from "@/entities/Profile";
import { fetchProfileAvatar } from "@/features/Profiles/profileCard/model/services/fetchProfileAvatar/fetchProfileAvatar";
import { updateProfileAvatar } from "@/features/Profiles/profileCard/model/services/updateProfileAvatar/updateProfileAvatar";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProfileData } from "../services/fetchProfileData/fetchProfileData";
import { updateProfileData } from "../services/updateProfileData/updateProfileData";
import { ProfileSchema } from "../types/ProfileSchema";

const initialState: ProfileSchema = {
    isDataLoading: false,
    dataError: "",
    profileData: {
        id: "",
        surname: undefined,
        name: undefined,
        patronymic: undefined,
        birthDate: undefined,
        avatar: undefined,
    },
    profileFormData: {
        id: "",
        surname: undefined,
        name: undefined,
        patronymic: undefined,
        birthDate: undefined,
        avatar: undefined,
    },
    isAvatarLoading: false,
    avatarError: "",
    profileDataAvatar: undefined,
    profileFormDataAvatar: undefined,
    _isDataInitialized: false,
    _isAvatarInitialized: false,
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        // Новые данные
        // setProfileData: (state, action: PayloadAction<Profile>) => {
        //     state.profileData = action.payload;
        // },
        setProfileFormData: (state, action: PayloadAction<Profile>) => {
            state.profileFormData = action.payload;
        },
        // setAvatar: (state, action: PayloadAction<string | undefined>) => {
        //     state.avatar = action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state, action) => {
                state.dataError = undefined;
                state.isDataLoading = true;
            })
            .addCase(fetchProfileData.fulfilled, (state, action) => {
                state.isDataLoading = false;
                state.dataError = undefined;
                state.profileData = action.payload;
                state.profileFormData = action.payload;
                state._isDataInitialized = true;
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isDataLoading = false;
                state.dataError = action.payload;
            })
            .addCase(fetchProfileAvatar.pending, (state, action) => {
                state.avatarError = undefined;
                state.isAvatarLoading = true;
            })
            .addCase(fetchProfileAvatar.fulfilled, (state, action) => {
                state.isAvatarLoading = false;
                state.avatarError = undefined;
                state.profileDataAvatar = action.payload;
                state.profileFormDataAvatar = action.payload;
                state._isAvatarInitialized = true;
            })
            .addCase(fetchProfileAvatar.rejected, (state, action) => {
                state.isAvatarLoading = false;
                state.avatarError = action.payload;
            })
            .addCase(updateProfileData.pending, (state, action) => {
                state.dataError = undefined;
                state.isDataLoading = true;
            })
            .addCase(updateProfileData.fulfilled, (state, action) => {
                state.isDataLoading = false;
                state.dataError = undefined;
            })
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isDataLoading = false;
                state.dataError = action.payload;
            })
            .addCase(updateProfileAvatar.pending, (state, action) => {
                state.avatarError = undefined;
                state.isAvatarLoading = true;
            })
            .addCase(updateProfileAvatar.fulfilled, (state, action) => {
                state.isAvatarLoading = false;
                state.avatarError = undefined;
            })
            .addCase(updateProfileAvatar.rejected, (state, action) => {
                state.isAvatarLoading = false;
                state.avatarError = action.payload;
            });
    },
});

export const { actions: profileActions, reducer: profileReducer } =
    profileSlice;
