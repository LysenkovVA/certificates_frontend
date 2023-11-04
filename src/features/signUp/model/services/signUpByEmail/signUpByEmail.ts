import { ThunkConfig } from "@/app/providers/StoreProvider";
import { userActions } from "@/entities/User/model/slice/userSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface SignUpByEmailProps {
    email: string;
    password: string;
}

export const signUpByEmail = createAsyncThunk<
    string,
    SignUpByEmailProps,
    ThunkConfig<string>
>("signUp/signUpByEmail", async (signUpData, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;

    try {
        // TODO какой запрос???
        const response = await extra.api.post<string>(
            "/auth/register?type=user",
            signUpData,
        );

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        // Добавляем в стейт данные об авторизованном пользователе
        dispatch(userActions.setRegisteredData(response.data));

        return response.data;
    } catch (e) {
        // TODO
        console.log("Error at registration: " + e);
        return rejectWithValue(JSON.stringify(e));
    }
});
