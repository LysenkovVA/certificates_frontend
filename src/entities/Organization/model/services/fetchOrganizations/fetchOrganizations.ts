import { ThunkConfig } from "@/app/providers/StoreProvider";
import { IOrganization } from "@/entities/Organization";
import {
    getOrganizationsLimit,
    getOrganizationsOffset,
} from "@/entities/Organization/model/selectors/organizationsSelectors";
import { FetchRowsResult } from "@/shared/types/FetchRowsResult";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface FetchOrganizationsProps {
    replaceData?: boolean; // Для использования в action.meta.arg
}

export const fetchOrganizations = createAsyncThunk<
    FetchRowsResult<IOrganization>,
    FetchOrganizationsProps,
    ThunkConfig<string>
>("organizations/fetchOrganizations", async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    // Получаем параметры из стейта
    const limit = getOrganizationsLimit(getState());
    const offset = getOrganizationsOffset(getState());

    try {
        // Добавляем параметры в строку запроса
        // addQueryParams({
        //
        // });

        // Отправляем запрос
        const response = await extra.api.get<FetchRowsResult<IOrganization>>(
            "/organizations",
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
