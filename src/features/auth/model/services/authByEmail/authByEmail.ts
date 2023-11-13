import { ThunkConfig } from "@/app/providers/StoreProvider";
import { userActions } from "@/entities/User/model/slice/userSlice";
import { IUser } from "@/entities/User/model/types/IUser";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface LoginByEmailProps {
    email: string;
    password: string;
}

export const authByEmail = createAsyncThunk<
    IUser,
    LoginByEmailProps,
    ThunkConfig<string>
>("auth/authByEmail", async (authData, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;

    try {
        // TODO
        const response = await extra.api.post<IUser>("/auth/login", authData);

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        localStorage.setItem(
            USER_LOCALSTORAGE_KEY,
            JSON.stringify(response.data),
        );
        // Добавляем в стейт данные об авторизованном пользователе
        dispatch(userActions.setAuthData(response.data));
        // Добавляем в стейт данные о профиле пользователя
        dispatch(userActions.setProfileData(response.data));

        return response.data;
    } catch (e) {
        return rejectWithValue("Не верный логин или пароль!");
    }
});
