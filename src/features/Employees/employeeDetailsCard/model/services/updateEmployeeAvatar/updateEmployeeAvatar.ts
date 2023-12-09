import { ThunkConfig } from "@/app/providers/StoreProvider";
import { File, uploadFile } from "@/entities/File";
import { getEmployeeAvatarUploadRoute } from "@/shared/config/routeConfig/fileRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface UpdateEmployeeAvatarProps {
    employeeId: string;
    file: Blob;
}

export const updateEmployeeAvatar = createAsyncThunk<
    File | string | undefined,
    UpdateEmployeeAvatarProps,
    ThunkConfig<string>
>("employee/updateEmployeeAvatar", async ({ employeeId, file }, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    try {
        const route = getEmployeeAvatarUploadRoute(employeeId);

        return await dispatch(uploadFile({ route, file })).then(
            (result) => result.payload,
        );
    } catch (e) {
        return rejectWithValue("Ошибка при загрузке аватара сотрудника!");
    }
});
