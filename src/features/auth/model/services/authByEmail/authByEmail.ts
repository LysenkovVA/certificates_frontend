import { ThunkConfig } from "@/app/providers/StoreProvider";
import { userActions } from "@/entities/User/model/slice/userSlice";
import { IAuth } from "@/features/auth/model/types/IAuth";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface LoginByEmailProps {
    email: string;
    password: string;
}

export const authByEmail = createAsyncThunk<
    IAuth,
    LoginByEmailProps,
    ThunkConfig<string>
>("auth/login", async (authData, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;

    try {
        // TODO
        const response = await extra.api.post<IAuth>("/auth/login", authData);

        if (response.status === 200) {
            // Записываем токен
            localStorage.setItem(
                USER_LOCALSTORAGE_KEY,
                JSON.stringify({
                    user: response.data.user,
                    accessToken: response.data.accessToken,
                }),
            );
            // Добавляем в стейт данные об авторизованном пользователе
            dispatch(userActions.setAuthData(response.data.user));
        }

        return response.data;
    } catch (e) {
        return rejectWithValue("Неверный логин или пароль!");
    }
});
