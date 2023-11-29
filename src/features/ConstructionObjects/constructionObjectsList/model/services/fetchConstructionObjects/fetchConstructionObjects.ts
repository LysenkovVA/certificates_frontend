import { ThunkConfig } from "@/app/providers/StoreProvider";
import { ConstructionObject } from "@/entities/ConstructionObject";
import { FetchRowsResult } from "@/shared/types/FetchRowsResult";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getConstructionObjectsListLimit,
    getConstructionObjectsListOffset,
} from "../../selectors/constructionObjectsListSelectors";

export interface FetchConstructionObjectsProps {
    replaceData?: boolean; // Для использования в action.meta.arg
}

export const fetchConstructionObjects = createAsyncThunk<
    FetchRowsResult<ConstructionObject>,
    FetchConstructionObjectsProps,
    ThunkConfig<string>
>("constructionObjects/fetchConstructionObjects", async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    // Получаем параметры из стейта
    const limit = getConstructionObjectsListLimit(getState());
    const offset = getConstructionObjectsListOffset(getState());

    try {
        const response = await extra.api.get<
            FetchRowsResult<ConstructionObject>
        >("/construction-objects", {
            params: {
                limit,
                offset,
            },
        });

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        return response.data;
    } catch (e) {
        return rejectWithValue("Ошибка при получении списка органзизаций");
    }
});
