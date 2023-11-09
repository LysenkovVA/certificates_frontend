import { fetchEmployeeById } from "@/entities/Employee/model/services/fetchEmployeeById/fetchEmployeeById";
import { EmployeeDetailsSchema } from "@/entities/Employee/model/types/EmployeeDetailsSchema";
import { IEmployee } from "@/entities/Employee/model/types/IEmployee";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: EmployeeDetailsSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const employeeDetailsSlice = createSlice({
    name: "employeeDetailsSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeeById.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                fetchEmployeeById.fulfilled,
                (state, action: PayloadAction<IEmployee>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                },
            )
            .addCase(fetchEmployeeById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: employeeDetailsActions } = employeeDetailsSlice;
export const { reducer: employeeDetailsReducer } = employeeDetailsSlice;
