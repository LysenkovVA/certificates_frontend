import { ThunkConfig } from "@/app/providers/StoreProvider";
import { ConstructionObject } from "@/entities/ConstructionObject";
import { FetchRowsResult } from "@/shared/types/FetchRowsResult";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getConstructionObjectsInfiniteListLimit,
    getConstructionObjectsInfiniteListOffset,
} from "../../selectors/constructionObjectsInfiniteListSelectors";

export interface FetchConstructionObjectsInfiniteListProps {
    replaceData?: boolean; // Для использования в action.meta.arg
}

export const fetchConstructionObjectsInfiniteList = createAsyncThunk<
    FetchRowsResult<ConstructionObject>,
    FetchConstructionObjectsInfiniteListProps,
    ThunkConfig<string>
>(
    "constructionObjects/fetchConstructionObjectsInfiniteList",
    async (props, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;

        // Получаем параметры из стейта
        const limit = getConstructionObjectsInfiniteListLimit(getState());
        const offset = getConstructionObjectsInfiniteListOffset(getState());

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
    },
);
