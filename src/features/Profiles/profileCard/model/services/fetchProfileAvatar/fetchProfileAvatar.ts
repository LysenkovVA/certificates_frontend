import { ThunkConfig } from "@/app/providers/StoreProvider";
import { downloadFile } from "@/entities/File";
import { getFileDownloadRoute } from "@/shared/config/routeConfig/fileRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface FetchProfileAvatarProps {
    fileId: string | undefined;
}

export const fetchProfileAvatar = createAsyncThunk<
    string | undefined,
    FetchProfileAvatarProps,
    ThunkConfig<string>
>("profile/fetchProfileAvatar", async ({ fileId }, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    try {
        if (!fileId) {
            return undefined;
        }

        return await dispatch(
            downloadFile({ route: getFileDownloadRoute(fileId) }),
        ).then((result) => result.payload);
    } catch (e) {
        return rejectWithValue("Ошибка при получении данных профиля!");
    }
});
