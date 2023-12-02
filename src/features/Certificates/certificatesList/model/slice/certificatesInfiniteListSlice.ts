import { fetchInfiniteListCertificates } from "@/features/Certificates/certificatesList/model/services/fetchInfiniteListCertificates/fetchInfiniteListCertificates";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { certificatesInfiniteListAdapter } from "../adapter/certificatesInfiniteListAdapter";
import { CertificatesInfiniteListSchema } from "../types/CertificatesInfiniteListSchema";

const initialState: CertificatesInfiniteListSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    limit: 10,
    offset: 0,
    hasMore: true,
    _isInitialized: false,
};

export const certificatesInfiniteListSlice = createSlice({
    name: "certificatesInfiniteListSlice",
    initialState,
    reducers: {
        setOffset: (state, action: PayloadAction<number>) => {
            state.offset = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInfiniteListCertificates.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    certificatesInfiniteListAdapter.removeAll(state);
                }
            })
            .addCase(
                fetchInfiniteListCertificates.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.error = undefined;

                    // Если данные заменяются
                    if (action.meta.arg.replaceData) {
                        // Записываем новые данные
                        certificatesInfiniteListAdapter.setAll(
                            state,
                            action.payload.rows,
                        );
                    } else {
                        // Добавляем порцию данных
                        certificatesInfiniteListAdapter.addMany(
                            state,
                            action.payload.rows,
                        );
                    }

                    state._isInitialized = true;
                    // Есть ли еще данные
                    state.hasMore = action.payload.count > state.ids.length;
                },
            )
            .addCase(
                fetchInfiniteListCertificates.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                },
            );
    },
});

export const {
    actions: certificatesInfiniteListActions,
    reducer: certificatesInfiniteListReducer,
} = certificatesInfiniteListSlice;
