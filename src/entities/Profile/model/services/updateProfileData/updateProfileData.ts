import { ThunkConfig } from "@/app/providers/StoreProvider";
import { fetchProfileData } from "@/entities/Profile/model/services/fetchProfileData/fetchProfileData";
import { Profile } from "@/entities/Profile/model/types/Profile";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface UpdateProfileDataProps {
    profileData: Profile;
}

export const updateProfileData = createAsyncThunk<
    boolean,
    UpdateProfileDataProps,
    ThunkConfig<string>
>("profile/updateProfile", async ({ profileData }, thunkApi) => {
    const { dispatch, extra, rejectWithValue, getState } = thunkApi;

    try {
        const response = await extra.api.patch<boolean>(
            `/profiles/${profileData.id}`,
            profileData,
        );

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        } else {
            // Получаем с сервера обновленные данные
            dispatch(fetchProfileData({ userId: profileData.user?.id }));
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(
            "Произошла ошибка при обновлении данных профиля!",
        );
    }
});
