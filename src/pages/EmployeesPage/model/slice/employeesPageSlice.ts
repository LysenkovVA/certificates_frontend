import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { employeesPageAdapter } from "../adapter/employeesPageAdapter";
import { fetchEmployees } from "../services/fetchEmployees/fetchEmployees";
import { EmployeesPageSchema } from "../types/EmployeesPageSchema";

const initialState: EmployeesPageSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    limit: 10,
    offset: 0,
    hasMore: true,
    searchQuery: "",
    _isInitialized: false,
};

export const employeesPageSlice = createSlice({
    name: "employees",
    initialState: employeesPageAdapter.getInitialState<EmployeesPageSchema>({
        ...initialState,
    }),
    reducers: {
        initializeState: (state) => {
            state._isInitialized = true;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload;
        },
        setOffset: (state, action: PayloadAction<number>) => {
            state.offset = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string | undefined>) => {
            state.searchQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    employeesPageAdapter.removeAll(state);
                }
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Записываем новые данные
                    employeesPageAdapter.setAll(state, action.payload.rows);
                } else {
                    // Добавляем порцию данных
                    employeesPageAdapter.addMany(state, action.payload.rows);
                }

                // Есть ли еще данные
                state.hasMore = action.payload.count > state.ids.length;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: employeesPageActions } = employeesPageSlice;
export const { reducer: employeesPageReducer } = employeesPageSlice;
