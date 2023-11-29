import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Organization } from "@/entities/Organization";

import { FetchRowsResult } from "@/shared/types/FetchRowsResult";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getOrganizationsListLimit,
    getOrganizationsListOffset,
} from "../../selectors/organizationsListSelectors";

export interface FetchOrganizationsProps {
    replaceData?: boolean; // Для использования в action.meta.arg
}

export const fetchOrganizations = createAsyncThunk<
    FetchRowsResult<Organization>,
    FetchOrganizationsProps,
    ThunkConfig<string>
>("organizations/fetchOrganizations", async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    // Получаем параметры из стейта
    const limit = getOrganizationsListLimit(getState());
    const offset = getOrganizationsListOffset(getState());

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
