import { StateSchema } from "@/app/providers/StoreProvider";

import { employeesPageAdapter } from "@/pages/EmployeesPage/model/adapter/employeesPageAdapter";

export const getEmployees = employeesPageAdapter.getSelectors<StateSchema>(
    (state) =>
        state.employeesPageSchema || employeesPageAdapter.getInitialState(),
);

export const getEmployeesIsLoading = (state: StateSchema) =>
    state?.employeesPageSchema?.isLoading || false;

export const getEmployeesError = (state: StateSchema) =>
    state?.employeesPageSchema?.error || "";

export const getEmployeesSearchQuery = (state: StateSchema) =>
    state?.employeesPageSchema?.searchQuery || "";
