import { ThunkConfig } from "@/app/providers/StoreProvider";
import { getAuthenticatedUser } from "@/entities/User";
import { userActions } from "@/entities/User/model/slice/userSlice";
import { IUser } from "@/entities/User/model/types/IUser";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface UpdateProfileDataProps {
    userId: string;
    userData: IUser;
}

export const updateProfileData = createAsyncThunk<
    boolean,
    UpdateProfileDataProps,
    ThunkConfig<string>
>("user/updateProfile", async ({ userId, userData }, thunkApi) => {
    const { dispatch, extra, rejectWithValue, getState } = thunkApi;

    try {
        const response = await extra.api.patch<boolean>(
            `/users/${userId}`,
            userData,
        );

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        // Обновляем данные пользователя
        const authData = getAuthenticatedUser(getState());
        dispatch(userActions.setAuthData({ ...authData, ...userData }));

        return response.data;
    } catch (e) {
        return rejectWithValue(
            "Произошла ошибка при обновлении данных профиля!",
        );
    }
});
