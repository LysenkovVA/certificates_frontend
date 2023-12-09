import { ThunkConfig } from "@/app/providers/StoreProvider";
import { userActions } from "@/entities/User/model/slice/userSlice";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const authLogout = createAsyncThunk<void, void, ThunkConfig<string>>(
    "auth/logout",
    async (_, thunkApi) => {
        const { dispatch, extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post("/auth/logout");

            if (response.status === 200) {
                // Удаляем токен из локалсторадж
                localStorage.removeItem(USER_LOCALSTORAGE_KEY);

                // Сброс состояния пользователя
                dispatch(userActions.setAuthData({}));
            }

            return response.data;
        } catch (e) {
            return rejectWithValue("Ошибка при выходе!");
        }
    },
);
