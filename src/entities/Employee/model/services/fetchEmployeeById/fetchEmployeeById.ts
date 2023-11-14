import { ThunkConfig } from "@/app/providers/StoreProvider";
import { IEmployee } from "@/entities/Employee/model/types/IEmployee";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface FetchEmployeeByIdProps {
    id: string;
}

export const fetchEmployeeById = createAsyncThunk<
    IEmployee,
    FetchEmployeeByIdProps,
    ThunkConfig<string>
>("employee/fetchEmployeeById", async ({ id }, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<IEmployee>(`/employees/${id}`);

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
