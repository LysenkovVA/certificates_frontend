import { ThunkConfig } from "@/app/providers/StoreProvider";
import { getEmployeesIsInitialized } from "@/pages/EmployeesPage/model/selectors/getEmployees/getEmployees";
import { fetchEmployees } from "@/pages/EmployeesPage/model/services/fetchEmployees/fetchEmployees";
import { employeesPageActions } from "@/pages/EmployeesPage/model/slice/employeesPageSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
    const isInitialized = getEmployeesIsInitialized(getState());

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
