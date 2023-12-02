import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Berth } from "@/entities/Berth";
import { FetchRowsResult } from "@/shared/types/FetchRowsResult";
import { createAsyncThunk } from "@reduxjs/toolkit";
export interface FetchAllBerthesProps {
    replaceData?: boolean; // Для использования в action.meta.arg
}

export const fetchAllBerthes = createAsyncThunk<
    FetchRowsResult<Berth>,
    FetchAllBerthesProps,
    ThunkConfig<string>
>("berthes/fetchAllBerthes", async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    try {
        // Отправляем запрос
        const response =
            await extra.api.get<FetchRowsResult<Berth>>("/berthes");

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        return response.data;
    } catch (e) {
        return rejectWithValue("Ошибка при получении списка органзизаций");
    }
});
