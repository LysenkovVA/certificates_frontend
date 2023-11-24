import { ThunkConfig } from "@/app/providers/StoreProvider";
import { IConstructionObject } from "@/entities/ConstructionObject";
import {
    getConstructionObjectsLimit,
    getConstructionObjectsOffset,
} from "@/entities/ConstructionObject/model/selectors/constructionObjectsSelectors";
import { FetchRowsResult } from "@/shared/types/FetchRowsResult";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface FetchConstructionObjectsProps {
    replaceData?: boolean; // Для использования в action.meta.arg
}

export const fetchConstructionObjects = createAsyncThunk<
    FetchRowsResult<IConstructionObject>,
    FetchConstructionObjectsProps,
    ThunkConfig<string>
>("constructionObjects/fetchConstructionObjects", async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    // Получаем параметры из стейта
    const limit = getConstructionObjectsLimit(getState());
    const offset = getConstructionObjectsOffset(getState());

    try {
        // Добавляем параметры в строку запроса
        // addQueryParams({
        //
        // });

        // Отправляем запрос
        const response = await extra.api.get<
            FetchRowsResult<IConstructionObject>
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
