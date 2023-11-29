import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Employee } from "@/entities/Employee/model/types/Employee";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface FetchEmployeeByIdProps {
    id: string;
}

export const fetchEmployeeById = createAsyncThunk<
    Employee,
    FetchEmployeeByIdProps,
    ThunkConfig<string>
>("employee/fetchEmployeeById", async ({ id }, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<Employee>(`/employees/${id}`);

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(
            "Произошла ошибка при получении данных сотрудника!",
        );
    }
});
