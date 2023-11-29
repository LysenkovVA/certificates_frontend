import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Employee } from "@/entities/Employee";
import { getEmployeesListLimit } from "@/features/Employees/employeesList/model/selectors/getEmployeesLimit/getEmployeesLimit";
import { getEmployeesListOffset } from "@/features/Employees/employeesList/model/selectors/getEmployeesOffset/getEmployeesOffset";
import { getEmployeesListSearchQuery } from "@/features/Employees/employeesList/model/selectors/getEmployeesSearchQuery/getEmployeesSearchQuery";
import { addQueryParams } from "@/shared/lib/url/addQueryParams";
import { FetchRowsResult } from "@/shared/types/FetchRowsResult";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface FetchEmployeesProps {
    replaceData?: boolean; // Для использования в action.meta.arg
}

export const fetchEmployees = createAsyncThunk<
    FetchRowsResult<Employee>,
    FetchEmployeesProps,
    ThunkConfig<string>
>("employees/fetchEmployees", async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    // Получаем параметры из стейта
    const limit = getEmployeesListLimit(getState());
    const offset = getEmployeesListOffset(getState());
    const searchQuery = getEmployeesListSearchQuery(getState());

    try {
        // Добавляем параметры в строку запроса
        addQueryParams({
            searchQuery,
        });

        // Отправляем запрос
        const response = await extra.api.get<FetchRowsResult<Employee>>(
            "/employees",
            {
                params: {
                    limit,
                    offset,
                    searchQuery,
                },
            },
        );

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(JSON.stringify(e));
    }
});
