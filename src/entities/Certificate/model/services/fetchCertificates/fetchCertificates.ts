import { ThunkConfig } from "@/app/providers/StoreProvider";
import { ICertificate } from "@/entities/Certificate";
import {
    getCertificatesLimit,
    getCertificatesOffset,
} from "@/entities/Certificate/model/selectors/certificatesSelectors";
import { FetchRowsResult } from "@/shared/types/FetchRowsResult";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface FetchCertificatesProps {
    replaceData?: boolean; // Для использования в action.meta.arg
}

export const fetchCertificates = createAsyncThunk<
    FetchRowsResult<ICertificate>,
    FetchCertificatesProps,
    ThunkConfig<string>
>("certificates/fetchCertificates", async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    // Получаем параметры из стейта
    const limit = getCertificatesLimit(getState());
    const offset = getCertificatesOffset(getState());

    try {
        // Добавляем параметры в строку запроса
        // addQueryParams({
        //
        // });

        // Отправляем запрос
        const response = await extra.api.get<FetchRowsResult<ICertificate>>(
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
