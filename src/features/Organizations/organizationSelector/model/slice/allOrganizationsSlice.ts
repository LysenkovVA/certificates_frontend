import { createSlice } from "@reduxjs/toolkit";
import { allOrganizationsAdapter } from "../adapter/allOrganizationsAdapter";
import { fetchAllOrganizations } from "../services/fetchAllOrganizations/fetchAllOrganizations";
import { AllOrganizationsSchema } from "../types/AllOrganizationsSchema";

const initialState: AllOrganizationsSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    _isInitialized: false,
};

export const allOrganizationsSlice = createSlice({
    name: "allOrganizationsSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllOrganizations.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    allOrganizationsAdapter.removeAll(state);
                }
            })
            .addCase(fetchAllOrganizations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Записываем новые данные
                    allOrganizationsAdapter.setAll(state, action.payload.rows);
                } else {
                    // Добавляем порцию данных
                    allOrganizationsAdapter.addMany(state, action.payload.rows);
                }

                state._isInitialized = true;
            })
            .addCase(fetchAllOrganizations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    actions: allOrganizationsActions,
    reducer: allOrganizationsReducer,
} = allOrganizationsSlice;
