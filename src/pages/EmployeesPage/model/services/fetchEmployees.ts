import { ThunkConfig } from "@/app/providers/StoreProvider";
import { IEmployee } from "@/entities/Employee/model/types/IEmployee";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface FetchEmployeesProps {
    limit: number;
    offset: number;
}

export const fetchEmployees = createAsyncThunk<
    IEmployee[],
    FetchEmployeesProps,
    ThunkConfig<string>
>("employees/fetchEmployees", async (props, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<IEmployee[]>(
            `/employees?limit=${props.limit}&offset=${props.offset}`,
        );

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(JSON.stringify(e));
    }
});
