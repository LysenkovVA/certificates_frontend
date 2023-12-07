import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Profile } from "@/entities/Profile";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface FetchProfileDataProps {
    profileId: string | undefined;
}

export const fetchProfileData = createAsyncThunk<
    Profile,
    FetchProfileDataProps,
    ThunkConfig<string>
>("profile/fetchProfileData", async ({ profileId }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        // TODO
        const response = await extra.api.get<Profile>(`/profiles/${profileId}`);

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        return response.data;
    } catch (e) {
        return rejectWithValue("Ошибка при получении данных профиля!");
    }
});
