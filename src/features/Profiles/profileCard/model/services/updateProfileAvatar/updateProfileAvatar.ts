import { ThunkConfig } from "@/app/providers/StoreProvider";
import { File, uploadFile } from "@/entities/File";
import { getProfileAvatarUploadRoute } from "@/shared/config/routeConfig/fileRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface UpdateProfileAvatarProps {
    profileId: string;
    file: Blob;
}

export const updateProfileAvatar = createAsyncThunk<
    File | string | undefined,
    UpdateProfileAvatarProps,
    ThunkConfig<string>
>("profile/updateProfileAvatar", async ({ profileId, file }, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    try {
        const route = getProfileAvatarUploadRoute(profileId);

        return await dispatch(uploadFile({ route, file })).then(
            (result) => result.payload,
        );
    } catch (e) {
        return rejectWithValue("Ошибка при получении аватара профиля!");
    }
});
