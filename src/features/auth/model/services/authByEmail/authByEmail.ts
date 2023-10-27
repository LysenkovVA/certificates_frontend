import { userActions } from "@/entities/User/model/slice/userSlice";
import { IUser } from "@/entities/User/model/types/IUser";
import { $api } from "@/shared/api/axios";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface LoginByEmailProps {
    email: string;
    password: string;
}

export const authByEmail = createAsyncThunk<
    IUser,
    LoginByEmailProps,
    { rejectValue: string }
>("auth/authByEmail", async (authData, thunkApi) => {
    try {
        // TODO
        const response = await $api.post<IUser>("/auth/login", authData);

        if (!response.data) {
            return thunkApi.rejectWithValue("Ответ от сервера не получен");
        }

        localStorage.setItem(
            USER_LOCALSTORAGE_KEY,
            JSON.stringify(response.data),
        );
        // Добавляем в стейт данные об авторизованном пользователе
        thunkApi.dispatch(userActions.setAuthData(response.data));

        return response.data;
    } catch (e) {
        // TODO
        console.log("Error at authorization: " + e);
        return thunkApi.rejectWithValue("Не верный логин или пароль!");
    }
});
