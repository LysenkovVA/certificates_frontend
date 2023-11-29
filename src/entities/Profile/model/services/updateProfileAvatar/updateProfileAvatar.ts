import { ThunkConfig } from "@/app/providers/StoreProvider";
import { File } from "@/entities/File";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosHeaders } from "axios";

export interface LoadProfileAvatarProps {
    profileId: string | undefined;
    image?: Blob;
}

export const updateProfileAvatar = createAsyncThunk<
    File,
    LoadProfileAvatarProps,
    ThunkConfig<string>
>("profile/updateProfileAvatar", async ({ profileId, image }, thunkApi) => {
    const { dispatch, extra, rejectWithValue, getState } = thunkApi;

    try {
        if (!image) {
            return rejectWithValue("Нет данных изображения");
        }

        const formData = new FormData();
        formData.append("file", image, "profile.jpeg");

        const headers = new AxiosHeaders();
        headers.setContentType("multipart/form-data");

        const response = await extra.api.post<File>(
            `/files/upload/${profileId}/avatar`,
            formData,
            {
                headers,
            },
        );

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(
            "Произошла ошибка при загрузке аватара профиля!",
        );
    }
});
