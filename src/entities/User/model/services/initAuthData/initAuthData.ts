import { ThunkConfig } from "@/app/providers/StoreProvider";
import { User } from "@/entities/User";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
    "user/initAuthData",
    async (_, thunkApi) => {
        const { dispatch, extra, rejectWithValue } = thunkApi;

        try {
            // Достаем из локалсторадж поле user
            const data = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (data) {
                // Если нашли такое поле, у него есть id и email
                const id = JSON.parse(data).user?.id;

                if (id) {
                    const response = await extra.api.get<User>(`/users/${id}`);
                    return response.data;
                }
            }

            return rejectWithValue("Нет данных в localstorage");
        } catch (e) {
            return rejectWithValue("Неверный логин или пароль!");
        }
    },
);
