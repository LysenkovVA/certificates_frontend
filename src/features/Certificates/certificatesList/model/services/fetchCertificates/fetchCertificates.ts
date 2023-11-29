import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Certificate } from "@/entities/Certificate";
import {
    getCertificatesListLimit,
    getCertificatesListOffset,
} from "@/features/Certificates/certificatesList/model/selectors/certificatesListSelectors";
import { FetchRowsResult } from "@/shared/types/FetchRowsResult";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface FetchCertificatesProps {
    replaceData?: boolean; // Для использования в action.meta.arg
}

export const fetchCertificates = createAsyncThunk<
    FetchRowsResult<Certificate>,
    FetchCertificatesProps,
    ThunkConfig<string>
>("certificates/fetchCertificates", async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    // Получаем параметры из стейта
    const limit = getCertificatesListLimit(getState());
    const offset = getCertificatesListOffset(getState());

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
