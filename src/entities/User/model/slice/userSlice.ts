import { updateProfileData } from "@/entities/Profile/model/services/updateProfileData/updateProfileData";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../types/IUser";
import { UserSchema } from "../types/UserSchema";

const initialState: UserSchema = {
    authenticatedUser: {
        id: "",
        email: "",
        token: "",
    },
    registeredUserId: undefined,
    isLoading: false,
    error: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Новые данные
        setAuthData: (state, action: PayloadAction<IUser>) => {
            state.authenticatedUser = action.payload;
        },
        // Инициализация при отрытии приложения
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (user) {
                state.authenticatedUser = JSON.parse(user);
            }
        },
        // Выход из приложения
        logout: (state) => {
            state.authenticatedUser = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
        setRegisteredData: (state, action: PayloadAction<string>) => {
            state.registeredUserId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateProfileData.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(updateProfileData.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
