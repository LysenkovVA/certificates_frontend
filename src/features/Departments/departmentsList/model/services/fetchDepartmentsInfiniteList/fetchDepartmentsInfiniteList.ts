import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Department } from "@/entities/Department";
import { FetchRowsResult } from "@/shared/types/FetchRowsResult";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getDepartmentsInfiniteListLimit,
    getDepartmentsInfiniteListOffset,
} from "../../selectors/departmentsInfiniteListSelectors";

export interface FetchDepartmentsInfiniteListProps {
    replaceData?: boolean; // Для использования в action.meta.arg
}

export const fetchDepartmentsInfiniteList = createAsyncThunk<
    FetchRowsResult<Department>,
    FetchDepartmentsInfiniteListProps,
    ThunkConfig<string>
>("departments/fetchDepartmentsInfiniteList", async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    // Получаем параметры из стейта
    const limit = getDepartmentsInfiniteListLimit(getState());
    const offset = getDepartmentsInfiniteListOffset(getState());

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
