import { ThunkConfig } from "@/app/providers/StoreProvider";
import {
    getDepartmentsLimit,
    getDepartmentsOffset,
} from "@/entities/Department/model/selectors/departmentsSelectors";
import { IDepartment } from "@/entities/Department/model/types/IDepartment";
import { FetchRowsResult } from "@/shared/types/FetchRowsResult";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface FetchDepartmentsProps {
    replaceData?: boolean; // Для использования в action.meta.arg
}

export const fetchDepartments = createAsyncThunk<
    FetchRowsResult<IDepartment>,
    FetchDepartmentsProps,
    ThunkConfig<string>
>("departments/fetchDepartments", async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    // Получаем параметры из стейта
    const limit = getDepartmentsLimit(getState());
    const offset = getDepartmentsOffset(getState());

    try {
        // Добавляем параметры в строку запроса
        // addQueryParams({
        //
        // });

        // Отправляем запрос
        const response = await extra.api.get<FetchRowsResult<IDepartment>>(
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
