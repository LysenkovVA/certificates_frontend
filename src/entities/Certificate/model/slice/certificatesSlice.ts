import { CertificatesSchema } from "@/entities/Certificate";
import { certificatesAdapter } from "@/entities/Certificate/model/adapter/certificatesAdapter";
import { fetchCertificates } from "@/entities/Certificate/model/services/fetchCertificates/fetchCertificates";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CertificatesSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    limit: 10,
    offset: 0,
    hasMore: true,
    _isInited: false,
};

export const certificatesSlice = createSlice({
    name: "certificatesSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCertificates.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    certificatesAdapter.removeAll(state);
                }
            })
            .addCase(fetchCertificates.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Записываем новые данные
                    certificatesAdapter.setAll(state, action.payload.rows);
                } else {
                    // Добавляем порцию данных
                    certificatesAdapter.addMany(state, action.payload.rows);
                }

                state._isInited = true;
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
    certificatesSlice;
