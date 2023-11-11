import { IEmployee } from "@/entities/Employee/model/types/IEmployee";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { employeesPageAdapter } from "../adapter/employeesPageAdapter";
import { fetchEmployees } from "../services/fetchEmployees";
import { EmployeesPageSchema } from "../types/EmployeesPageSchema";

const initialState: EmployeesPageSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,

    // page
    searchQuery: "",
};

export const employeesPageSlice = createSlice({
    name: "employees",
    initialState: employeesPageAdapter.getInitialState<EmployeesPageSchema>({
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
                    employeesPageAdapter.setAll(state, action.payload);
                },
            )
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: employeesPageActions } = employeesPageSlice;
export const { reducer: employeesPageReducer } = employeesPageSlice;
