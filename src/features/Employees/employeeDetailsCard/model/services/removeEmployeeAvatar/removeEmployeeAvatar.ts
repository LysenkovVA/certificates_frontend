import { ThunkConfig } from "@/app/providers/StoreProvider";
import { deleteFile } from "@/entities/File/model/services/deleteFile/deleteFile";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface RemoveEmployeeAvatarProps {
    fileId: string | undefined;
}

export const removeEmployeeAvatar = createAsyncThunk<
    void,
    RemoveEmployeeAvatarProps,
    ThunkConfig<string>
>("profile/removeEmployeeAvatar", async ({ fileId }, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    try {
        await dispatch(deleteFile({ fileId })).then((result) => result.payload);
    } catch (e) {
        return rejectWithValue("Ошибка при удалении аватара профиля!");
    }
});
