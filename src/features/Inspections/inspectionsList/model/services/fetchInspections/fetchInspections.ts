import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Inspection } from "@/entities/Inspection";
import { FetchRowsResult } from "@/shared/types/FetchRowsResult";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getInspectionListOffset,
    getInspectionsListLimit,
} from "../../selectors/inspectionsListSelectors";

export interface FetchInspectionsProps {
    replaceData?: boolean; // Для использования в action.meta.arg
}

export const fetchInspections = createAsyncThunk<
    FetchRowsResult<Inspection>,
    FetchInspectionsProps,
    ThunkConfig<string>
>("inspections/fetchInspections", async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    // Получаем параметры из стейта
    const limit = getInspectionsListLimit(getState());
    const offset = getInspectionListOffset(getState());

    try {
        const response = await extra.api.get<FetchRowsResult<Inspection>>(
            "/inspections",
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
