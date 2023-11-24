import { fetchProfileData } from "@/entities/Profile/model/services/fetchProfileData/fetchProfileData";
import { IProfile } from "@/entities/Profile/model/types/IProfile";
import { ProfileSchema } from "@/entities/Profile/model/types/ProfileSchema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ProfileSchema = {
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
    newAvatar: undefined,
    isLoading: false,
    error: "",
    _isInitialized: false,
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        // Новые данные
        setProfileData: (state, action: PayloadAction<IProfile>) => {
            state.profileData = action.payload;
        },
        setProfileFormData: (state, action: PayloadAction<IProfile>) => {
            state.profileFormData = action.payload;
        },
        // setNewAvatar: (state, action: PayloadAction<string | undefined>) => {
        //     state.newAvatar = action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchProfileData.fulfilled, (state, action) => {
                state.isLoading = false;
                state._isInitialized = true;
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
