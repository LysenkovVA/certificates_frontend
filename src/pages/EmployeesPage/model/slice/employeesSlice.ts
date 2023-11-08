import { IEmployee } from "@/entities/Employee/model/types/IEmployee";
import { fetchEmployees } from "@/pages/EmployeesPage/model/services/fetchEmployees";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EmployeesSchema } from "../types/EmployeesSchema";

const initialState: EmployeesSchema = {
    isLoading: false,
    error: undefined,
    employees: [],
};

export const employeesSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        setEmployees: (state, action: PayloadAction<IEmployee[]>) => {
            state.employees = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                fetchEmployees.fulfilled,
                (state, action: PayloadAction<IEmployee[]>) => {
                    state.isLoading = false;
                    state.error = undefined;
                    state.employees = action.payload;
                },
            )
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: employeesActions } = employeesSlice;
export const { reducer: employeesReducer } = employeesSlice;
