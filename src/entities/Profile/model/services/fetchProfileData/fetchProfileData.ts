import { ThunkConfig } from "@/app/providers/StoreProvider";
import { profileActions } from "@/entities/Profile/model/slice/profileSlice";
import { Profile } from "@/entities/Profile/model/types/Profile";
import { User } from "@/entities/User/model/types/User";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface FetchProfileDataProps {
    userId: string | undefined;
}

export const fetchProfileData = createAsyncThunk<
    User,
    FetchProfileDataProps,
    ThunkConfig<string>
>("profile/fetchProfileData", async ({ userId }, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;

    try {
        // TODO
        const response = await extra.api.get<Profile>(`/profiles/${userId}`);

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        dispatch(profileActions.setProfileData(response.data));
        dispatch(profileActions.setProfileFormData(response.data));

        return response.data;
    } catch (e) {
        return rejectWithValue("Ошибка при получении данных профиля!");
    }
});
