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

        console.log("ORGANIZATIONS RESPONSE START");

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
        // .catch(function (error) {
        //     if (error.response) {
        //         // Запрос был сделан, и сервер ответил кодом состояния, который
        //         // выходит за пределы 2xx
        //         console.log(error.response.data);
        //         console.log(error.response.status);
        //         console.log(error.response.headers);
        //     } else if (error.request) {
        //         // Запрос был сделан, но ответ не получен
        //         // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
        //         // http.ClientRequest в node.js
        //         console.log(error.request);
        //     } else {
        //         // Произошло что-то при настройке запроса, вызвавшее ошибку
        //         console.log("Error", error.message);
        //     }
        //     console.log(error.config);

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        return response.data;
    } catch {
        return rejectWithValue("Ошибка при получении списка организаций");
    }
});
