import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Department } from "@/entities/Department";
import { FetchRowsResult } from "@/shared/types/FetchRowsResult";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getDepartmentsListLimit,
    getDepartmentsListOffset,
} from "../../selectors/departmentsListSelectors";

export interface FetchDepartmentsProps {
    replaceData?: boolean; // Для использования в action.meta.arg
}

export const fetchDepartments = createAsyncThunk<
    FetchRowsResult<Department>,
    FetchDepartmentsProps,
    ThunkConfig<string>
>("departments/fetchDepartments", async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    // Получаем параметры из стейта
    const limit = getDepartmentsListLimit(getState());
    const offset = getDepartmentsListOffset(getState());

    try {
        const response = await extra.api.get<FetchRowsResult<Department>>(
            "/departments",
            {
                params: {
                    limit,
                    offset,
                },
            },
        );

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        return response.data;
    } catch (e) {
        return rejectWithValue("Ошибка при получении списка органзизаций");
    }
});
