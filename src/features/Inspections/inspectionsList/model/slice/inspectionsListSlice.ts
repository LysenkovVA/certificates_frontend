import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { inspectionsListAdapter } from "../adapter/inspectionsListAdapter";
import { fetchInspections } from "../services/fetchInspections/fetchInspections";
import { InspectionsSchema } from "../types/InspectionsSchema";

const initialState: InspectionsSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    limit: 10,
    offset: 0,
    hasMore: true,
    _isInitialized: false,
};

export const inspectionsListSlice = createSlice({
    name: "inspectionsListSlice",
    initialState,
    reducers: {
        setOffset: (state, action: PayloadAction<number>) => {
            state.offset = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInspections.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    inspectionsListAdapter.removeAll(state);
                }
            })
            .addCase(fetchInspections.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Записываем новые данные
                    inspectionsListAdapter.setAll(state, action.payload.rows);
                } else {
                    // Добавляем порцию данных
                    inspectionsListAdapter.addMany(state, action.payload.rows);
                }

                state._isInitialized = true;
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
    inspectionsListSlice;
