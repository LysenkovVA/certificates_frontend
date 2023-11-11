import { ThunkConfig } from "@/app/providers/StoreProvider";
import { getAuthenticatedUser } from "@/entities/User";
import { userActions } from "@/entities/User/model/slice/userSlice";
import { IUser } from "@/entities/User/model/types/IUser";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export interface UpdateProfileDataProps {
    userId: string;
    userData: IUser;
}

export const updateProfile = createAsyncThunk<
    boolean,
    UpdateProfileDataProps,
    ThunkConfig<string>
>("user/updateProfile", async ({ userId, userData }, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;

    try {
        // TODO
        const response = await extra.api.patch<boolean>(
            `/users/${userId}`,
            userData,
        );

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        // Обновляем данные пользователя
        const authData = useSelector(getAuthenticatedUser);
        dispatch(userActions.setAuthData({ ...authData, ...userData }));

        // dispatch(userActions.initAuthData());

        return response.data;
    } catch (e) {
        return rejectWithValue(
            "Произошла ошибка при обновлении данных профиля!",
        );
    }
});
