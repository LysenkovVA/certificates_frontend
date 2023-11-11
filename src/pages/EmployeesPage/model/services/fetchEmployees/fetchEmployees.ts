import { ThunkConfig } from "@/app/providers/StoreProvider";
import { IEmployee } from "@/entities/Employee/model/types/IEmployee";
import {
    getEmployeesLimit,
    getEmployeesOffset,
    getEmployeesSearchQuery,
} from "@/pages/EmployeesPage/model/selectors/getEmployees/getEmployees";
import { addQueryParams } from "@/shared/lib/url/addQueryParams";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface FetchEmployeesProps {
    replaceData?: boolean; // Для использования в action.meta.arg
}

export const fetchEmployees = createAsyncThunk<
    IEmployee[],
    FetchEmployeesProps,
    ThunkConfig<string>
>("employees/fetchEmployees", async (props, thunkApi) => {
    const { dispatch, extra, rejectWithValue, getState } = thunkApi;

    // Получаем параметры из стейта
    const limit = getEmployeesLimit(getState());
    const offset = getEmployeesOffset(getState());
    const searchQuery = getEmployeesSearchQuery(getState());

    try {
        // Добавляем параметры в строку запроса
        addQueryParams({
            limit: String(limit),
            offset: String(offset),
            searchQuery,
        });

        // Отправляем запрос
        const response = await extra.api.get<IEmployee[]>("/employees", {
            params: {
                limit,
                offset,
                searchQuery,
            },
        });

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(JSON.stringify(e));
    }
});
