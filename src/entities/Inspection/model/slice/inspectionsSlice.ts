import { InspectionsSchema } from "@/entities/Inspection";
import { inspectionsAdapter } from "@/entities/Inspection/model/adapter/inspectionsAdapter";
import { fetchInspections } from "@/entities/Inspection/model/services/fetchInspections/fetchInspections";
import { createSlice } from "@reduxjs/toolkit";

const initialState: InspectionsSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    limit: 10,
    offset: 0,
    hasMore: true,
    _isInited: false,
};

export const inspectionsSlice = createSlice({
    name: "inspectionsSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInspections.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    inspectionsAdapter.removeAll(state);
                }
            })
            .addCase(fetchInspections.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Записываем новые данные
                    inspectionsAdapter.setAll(state, action.payload.rows);
                } else {
                    // Добавляем порцию данных
                    inspectionsAdapter.addMany(state, action.payload.rows);
                }

                state._isInited = true;
                // Есть ли еще данные
                state.hasMore = action.payload.count > state.ids.length;
            })
            .addCase(fetchInspections.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: inspectionsActions, reducer: inspectionsReducer } =
    inspectionsSlice;
