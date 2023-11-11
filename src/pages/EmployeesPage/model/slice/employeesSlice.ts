import { IEmployee } from "@/entities/Employee/model/types/IEmployee";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { employeesAdapter } from "../adapter/employeesAdapter";
import { fetchEmployees } from "../services/fetchEmployees";
import { EmployeesSchema } from "../types/EmployeesSchema";

const initialState: EmployeesSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    // employees: [],
    searchQuery: "",
};

export const employeesSlice = createSlice({
    name: "employees",
    initialState: employeesAdapter.getInitialState<EmployeesSchema>({
        ...initialState,
    }),
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string | undefined>) => {
            state.searchQuery = action.payload;
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
                    employeesAdapter.setAll(state, action.payload);
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
