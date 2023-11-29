import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getEmployeesListIsInitialized } from "../../selectors/getEmployeesIsInitialized/getEmployeesIsInitialized";
import { fetchEmployees } from "../../services/fetchEmployees/fetchEmployees";
import { employeesPageActions } from "../../slice/employeesPageSlice";

/**
 * Требуется для инциализации начального состояния,
 * получает параметры из строки запроса в браузере
 */
export const initializeEmployeesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>("employeesPage/initializeEmployeesPage", async (searchParams, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const isInitialized = getEmployeesListIsInitialized(getState());

    if (!isInitialized) {
        // Получаем параметры из строки запроса
        const searchQueryFromUrl = searchParams.get("searchQuery");

        // Устанавливаем состояние
        if (searchQueryFromUrl) {
            dispatch(employeesPageActions.setSearchQuery(searchQueryFromUrl));
        }

        // Инициализируем стейт
        dispatch(employeesPageActions.initializeState());

        // Получаем сотрудников
        dispatch(fetchEmployees({}));
    }
});
