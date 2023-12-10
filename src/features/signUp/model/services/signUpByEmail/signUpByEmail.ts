import { ThunkConfig } from "@/app/providers/StoreProvider";
import { userActions } from "@/entities/User/model/slice/userSlice";
import { ISignUp } from "@/features/signUp/model/types/ISignUp";
import { $publicApi } from "@/shared/api/axios";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface SignUpByEmailProps {
    email: string;
    password: string;
}

export const signUpByEmail = createAsyncThunk<
    ISignUp,
    SignUpByEmailProps,
    ThunkConfig<string>
>("signUp/signUpByEmail", async (signUpData, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;

    try {
        const response = await $publicApi.post<ISignUp>(
            "/auth/register",
            signUpData,
            {
                params: {
                    type: "user",
                },
            },
        );

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        // Записываем токен
        localStorage.setItem(
            USER_LOCALSTORAGE_KEY,
            JSON.stringify({
                user: response.data.user,
                accessToken: response.data.accessToken,
            }),
        );

        // Добавляем в стейт данные об авторизованном пользователе
        dispatch(userActions.setRegisteredData(String(response.data.user.id)));

        return response.data;
    } catch (e) {
        return rejectWithValue(JSON.stringify(e));
    }
});
