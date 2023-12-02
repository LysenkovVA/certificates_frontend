import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Certificate } from "@/entities/Certificate";
import {
    getCertificatesInfiniteListLimit,
    getCertificatesInfiniteListOffset,
} from "@/features/Certificates/certificatesInfiniteList/model/selectors/certificatesInfiniteListSelectors";
import { FetchRowsResult } from "@/shared/types/FetchRowsResult";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface FetchInfiniteListCertificatesProps {
    replaceData?: boolean; // Для использования в action.meta.arg
}

export const fetchInfiniteListCertificates = createAsyncThunk<
    FetchRowsResult<Certificate>,
    FetchInfiniteListCertificatesProps,
    ThunkConfig<string>
>("certificates/fetchInfiniteListCertificates", async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    // Получаем параметры из стейта
    const limit = getCertificatesInfiniteListLimit(getState());
    const offset = getCertificatesInfiniteListOffset(getState());

    try {
        // Отправляем запрос
        const response = await extra.api.get<FetchRowsResult<Certificate>>(
            "/certificates",
            {
                params: {
                    limit,
                    offset,
                },
            },
        );

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        return response.data;
    } catch (e) {
        return rejectWithValue("Ошибка при получении списка органзизаций");
    }
});
