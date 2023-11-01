import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../types/IUser";
import { UserSchema } from "../types/UserSchema";

const initialState: UserSchema = {
    authenticatedUser: {
        id: undefined,
        email: undefined,
        token: undefined,
        surname: undefined,
        name: undefined,
        patronymic: undefined,
        birthDate: undefined,
        avatar: undefined,
    },
    registeredUserId: undefined,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Новые данные
        setAuthData: (state, action: PayloadAction<IUser>) => {
            state.authenticatedUser = action.payload;
        },
        // Данные профиля
        setAuthDataSurname: (state, action: PayloadAction<string>) => {
            state.authenticatedUser.surname = action.payload;
        },
        setAuthDataName: (state, action: PayloadAction<string>) => {
            state.authenticatedUser.name = action.payload;
        },
        setAuthDataPatronymic: (state, action: PayloadAction<string>) => {
            state.authenticatedUser.patronymic = action.payload;
        },
        setAuthDataBirthDate: (state, action: PayloadAction<Date>) => {
            state.authenticatedUser.birthDate = action.payload;
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
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
