import { ThunkConfig } from "@/app/providers/StoreProvider";
import { deleteFile } from "@/entities/File/model/services/deleteFile/deleteFile";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface RemoveProfileAvatarProps {
    fileId: string | undefined;
}

export const removeProfileAvatar = createAsyncThunk<
    void,
    RemoveProfileAvatarProps,
    ThunkConfig<string>
>("profile/removeProfileAvatar", async ({ fileId }, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    try {
        await dispatch(deleteFile({ fileId })).then((result) => result.payload);
    } catch (e) {
        return rejectWithValue("Ошибка при получении аватара профиля!");
    }
});
