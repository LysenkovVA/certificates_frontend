import { ThunkConfig } from "@/app/providers/StoreProvider";
import { downloadFile } from "@/entities/File";
import { getFileDownloadRoute } from "@/shared/config/routeConfig/fileRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface FetchUserAvatarProps {
    fileId: string | undefined;
}

export const fetchUserAvatar = createAsyncThunk<
    string | undefined,
    FetchUserAvatarProps,
    ThunkConfig<string>
>("user/fetchUserAvatar", async ({ fileId }, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    try {
        if (!fileId) {
            return undefined;
        }

        return await dispatch(
            downloadFile({ route: getFileDownloadRoute(fileId) }),
        ).then((result) => result.payload);
    } catch (e) {
        return rejectWithValue("Ошибка при получении аватара пользователя!");
    }
});
