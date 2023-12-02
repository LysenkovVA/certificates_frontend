import { ThunkConfig } from "@/app/providers/StoreProvider";
import { getEmployeesInfiniteListIsInitialized } from "@/features/Employees/employeesInfiniteList/model/selectors/getEmployeesInfiniteListIsInitialized/getEmployeesInfiniteListIsInitialized";
import { fetchEmployeesInfiniteList } from "@/features/Employees/employeesInfiniteList/model/services/fetchEmployeesInfiniteList/fetchEmployeesInfiniteList";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { employeesInfiniteListActions } from "../../slice/employeesInfiniteListSlice";

/**
 * Требуется для инциализации начального состояния,
 * получает параметры из строки запроса в браузере
 */
export const initializeEmployeesInfiniteList = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>(
    "employeesPage/initializeEmployeesInfiniteList",
    async (searchParams, thunkApi) => {
        const { getState, dispatch } = thunkApi;
        const isInitialized = getEmployeesInfiniteListIsInitialized(getState());

        if (!isInitialized) {
            // Получаем параметры из строки запроса
            const searchQueryFromUrl = searchParams.get("searchQuery");

            // Устанавливаем состояние
            if (searchQueryFromUrl) {
                dispatch(
                    employeesInfiniteListActions.setSearchQuery(
                        searchQueryFromUrl,
                    ),
                );
            }

            // Инициализируем стейт
            dispatch(employeesInfiniteListActions.initializeState());

            // Получаем сотрудников
            dispatch(fetchEmployeesInfiniteList({ replaceData: true }));
        }
    },
);
