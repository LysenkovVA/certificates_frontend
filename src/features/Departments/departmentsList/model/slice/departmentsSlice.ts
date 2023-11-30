import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { departmentsListAdapter } from "../adapter/departmentsListAdapter";
import { fetchDepartments } from "../services/fetchDepartments/fetchDepartments";
import { DepartmentsSchema } from "../types/DepartmentsSchema";

const initialState: DepartmentsSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    limit: 10,
    offset: 0,
    hasMore: true,
    _isInitialized: false,
};

export const departmentsSlice = createSlice({
    name: "departmentsSlice",
    initialState,
    reducers: {
        setOffset: (state, action: PayloadAction<number>) => {
            state.offset = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartments.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    departmentsListAdapter.removeAll(state);
                }
            })
            .addCase(fetchDepartments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Записываем новые данные
                    departmentsListAdapter.setAll(state, action.payload.rows);
                } else {
                    // Добавляем порцию данных
                    departmentsListAdapter.addMany(state, action.payload.rows);
                }

                state._isInitialized = true;
                // Есть ли еще данные
                state.hasMore = action.payload.count > state.ids.length;
            })
            .addCase(fetchDepartments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: departmentsActions, reducer: departmentsReducer } =
    departmentsSlice;
