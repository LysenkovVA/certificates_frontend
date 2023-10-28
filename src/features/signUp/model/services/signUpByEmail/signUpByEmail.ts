import { userActions } from "@/entities/User/model/slice/userSlice";
import { $api } from "@/shared/api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface SignUpByEmailProps {
    email: string;
    password: string;
}

export const signUpByEmail = createAsyncThunk<
    string,
    SignUpByEmailProps,
    { rejectValue: string }
>("signUp/signUpByEmail", async (signUpData, thunkApi) => {
    try {
        // TODO какой запрос???
        const response = await $api.post<string>(
            "/auth/register?type=user",
            signUpData,
        );

        if (!response.data) {
            return thunkApi.rejectWithValue("Ответ от сервера не получен");
        }

        // Добавляем в стейт данные об авторизованном пользователе
        thunkApi.dispatch(userActions.setRegisteredData(response.data));

        return response.data;
    } catch (e) {
        // TODO
        console.log("Error at registration: " + e);
        return thunkApi.rejectWithValue(JSON.stringify(e));
    }
});
