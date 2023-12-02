import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Organization } from "@/entities/Organization";

import { FetchRowsResult } from "@/shared/types/FetchRowsResult";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getOrganizationsInfiniteListLimit,
    getOrganizationsInfiniteListOffset,
} from "../../selectors/organizationsInfiniteListSelectors";

export interface FetchOrganizationsInfiniteListProps {
    replaceData?: boolean; // Для использования в action.meta.arg
}

export const fetchOrganizationsInfiniteList = createAsyncThunk<
    FetchRowsResult<Organization>,
    FetchOrganizationsInfiniteListProps,
    ThunkConfig<string>
>("organizations/fetchOrganizationsInfiniteList", async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    // Получаем параметры из стейта
    const limit = getOrganizationsInfiniteListLimit(getState());
    const offset = getOrganizationsInfiniteListOffset(getState());

    try {
        // Отправляем запрос
        const response = await extra.api.get<FetchRowsResult<Organization>>(
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
    } catch {
        return rejectWithValue("Ошибка при получении списка организаций");
    }
});
