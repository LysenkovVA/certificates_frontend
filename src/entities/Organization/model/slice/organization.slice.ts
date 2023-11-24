import { OrganizationsSchema } from "@/entities/Organization";
import { organizationsAdapter } from "@/entities/Organization/model/adapter/organizationsAdapter";
import { fetchOrganizations } from "@/entities/Organization/model/services/fetchOrganizations/fetchOrganizations";
import { createSlice } from "@reduxjs/toolkit";

const initialState: OrganizationsSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    limit: 10,
    offset: 0,
    hasMore: true,
    _isInited: false,
};

export const organizationsSlice = createSlice({
    name: "organizationsSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrganizations.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    organizationsAdapter.removeAll(state);
                }
            })
            .addCase(fetchOrganizations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Записываем новые данные
                    organizationsAdapter.setAll(state, action.payload.rows);
                } else {
                    // Добавляем порцию данных
                    organizationsAdapter.addMany(state, action.payload.rows);
                }

                state._isInited = true;
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
    organizationsSlice;
