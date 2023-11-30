import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { organizationsListAdapter } from "../adapter/organizationsListAdapter";
import { fetchOrganizations } from "../services/fetchOrganizations/fetchOrganizations";
import { OrganizationsSchema } from "../types/OrganizationsSchema";

const initialState: OrganizationsSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    limit: 10,
    offset: 0,
    hasMore: true,
    _isInitialized: false,
};

export const organizationsListSlice = createSlice({
    name: "organizationsListSlice",
    initialState,
    reducers: {
        setOffset: (state, action: PayloadAction<number>) => {
            state.offset = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrganizations.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    organizationsListAdapter.removeAll(state);
                }
            })
            .addCase(fetchOrganizations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Записываем новые данные
                    organizationsListAdapter.setAll(state, action.payload.rows);
                } else {
                    // Добавляем порцию данных
                    organizationsListAdapter.addMany(
                        state,
                        action.payload.rows,
                    );
                }

                state._isInitialized = true;
                // Есть ли еще данные
                state.hasMore = action.payload.count > state.ids.length;
            })
            .addCase(fetchOrganizations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: organizationsActions, reducer: organizationsReducer } =
    organizationsListSlice;
