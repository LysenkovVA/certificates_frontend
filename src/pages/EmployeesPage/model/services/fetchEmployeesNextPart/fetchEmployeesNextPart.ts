import { ThunkConfig } from "@/app/providers/StoreProvider";
import {
    getEmployeesHasMore,
    getEmployeesIsLoading,
    getEmployeesLimit,
    getEmployeesOffset,
} from "@/pages/EmployeesPage/model/selectors/getEmployees/getEmployees";
import { fetchEmployees } from "@/pages/EmployeesPage/model/services/fetchEmployees/fetchEmployees";
import { employeesPageActions } from "@/pages/EmployeesPage/model/slice/employeesPageSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEmployeesNextPart = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>("employees/fetchEmployeesNextPart", async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const hasMore = getEmployeesHasMore(getState());
    const limit = getEmployeesLimit(getState());
    const offset = getEmployeesOffset(getState());
    const isLoading = getEmployeesIsLoading(getState());

    if (hasMore && !isLoading) {
        dispatch(employeesPageActions.setOffset(offset + limit));
        dispatch(fetchEmployees({}));
    }
});
