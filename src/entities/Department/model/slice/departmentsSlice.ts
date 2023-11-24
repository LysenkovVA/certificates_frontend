import { departmentsAdapter } from "@/entities/Department/model/adapter/departmentsAdapter";
import { fetchDepartments } from "@/entities/Department/model/services/fetchDepartments/fetchDepartments";
import { DepartmentsSchema } from "@/entities/Department/model/types/DepartmentsSchema";
import { createSlice } from "@reduxjs/toolkit";

const initialState: DepartmentsSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    limit: 10,
    offset: 0,
    hasMore: true,
    _isInited: false,
};

export const departmentsSlice = createSlice({
    name: "departmentsSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartments.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    departmentsAdapter.removeAll(state);
                }
            })
            .addCase(fetchDepartments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Записываем новые данные
                    departmentsAdapter.setAll(state, action.payload.rows);
                } else {
                    // Добавляем порцию данных
                    departmentsAdapter.addMany(state, action.payload.rows);
                }

                state._isInited = true;
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
