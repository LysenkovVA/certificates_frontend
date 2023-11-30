import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { certificatesListAdapter } from "../adapter/certificatesListAdapter";
import { fetchCertificates } from "../services/fetchCertificates/fetchCertificates";
import { CertificatesSchema } from "../types/CertificatesSchema";

const initialState: CertificatesSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    limit: 10,
    offset: 0,
    hasMore: true,
    _isInitialized: false,
};

export const certificatesListSlice = createSlice({
    name: "certificatesSlice",
    initialState,
    reducers: {
        setOffset: (state, action: PayloadAction<number>) => {
            state.offset = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCertificates.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    certificatesListAdapter.removeAll(state);
                }
            })
            .addCase(fetchCertificates.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Записываем новые данные
                    certificatesListAdapter.setAll(state, action.payload.rows);
                } else {
                    // Добавляем порцию данных
                    certificatesListAdapter.addMany(state, action.payload.rows);
                }

                state._isInitialized = true;
                // Есть ли еще данные
                state.hasMore = action.payload.count > state.ids.length;
            })
            .addCase(fetchCertificates.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: certificatesActions, reducer: certificatesReducer } =
    certificatesListSlice;
