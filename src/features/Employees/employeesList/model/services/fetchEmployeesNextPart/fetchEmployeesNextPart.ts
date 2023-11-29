import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getEmployeeListsHasMore } from "../../selectors/getEmployeesHasMore/getEmployeesHasMore";
import { getEmployeesListIsLoading } from "../../selectors/getEmployeesIsLoading/getEmployeesIsLoading";
import { getEmployeesListLimit } from "../../selectors/getEmployeesLimit/getEmployeesLimit";
import { getEmployeesListOffset } from "../../selectors/getEmployeesOffset/getEmployeesOffset";
import { fetchEmployees } from "../../services/fetchEmployees/fetchEmployees";
import { employeesPageActions } from "../../slice/employeesPageSlice";

export const fetchEmployeesNextPart = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>("employees/fetchEmployeesNextPart", async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const hasMore = getEmployeeListsHasMore(getState());
    const limit = getEmployeesListLimit(getState());
    const offset = getEmployeesListOffset(getState());
    const isLoading = getEmployeesListIsLoading(getState());

    if (hasMore && !isLoading) {
        dispatch(employeesPageActions.setOffset(offset + limit));
        dispatch(fetchEmployees({}));
    }
});
