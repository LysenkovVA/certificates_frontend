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
        // .then((value) => {
        //     return value.data;
        // })
        // .catch(() => {
        //     return rejectWithValue("Сотрудник не найден!");
        // });

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        if (response.status === 403) {
            return rejectWithValue("Сотрудник не найден!");
        }

        return response.data;
    } catch (e) {
        return rejectWithValue("Сотрудник не найден!");
    }
});
