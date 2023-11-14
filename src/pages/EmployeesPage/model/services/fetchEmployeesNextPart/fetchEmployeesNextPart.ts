import { ThunkConfig } from "@/app/providers/StoreProvider";
import { getEmployeesHasMore } from "@/pages/EmployeesPage/model/selectors/getEmployeesHasMore/getEmployeesHasMore";
import { getEmployeesIsLoading } from "@/pages/EmployeesPage/model/selectors/getEmployeesIsLoading/getEmployeesIsLoading";
import { getEmployeesLimit } from "@/pages/EmployeesPage/model/selectors/getEmployeesLimit/getEmployeesLimit";
import { getEmployeesOffset } from "@/pages/EmployeesPage/model/selectors/getEmployeesOffset/getEmployeesOffset";
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
