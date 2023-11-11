import { StateSchema } from "@/app/providers/StoreProvider";

import { employeesAdapter } from "@/pages/EmployeesPage/model/adapter/employeesAdapter";

export const getEmployees = employeesAdapter.getSelectors<StateSchema>(
    (state) => state.employeesSchema || employeesAdapter.getInitialState(),
);

export const getEmployeesIsLoading = (state: StateSchema) =>
    state?.employeesSchema?.isLoading || false;

export const getEmployeesError = (state: StateSchema) =>
    state?.employeesSchema?.error || "";

export const getEmployeesSearchQuery = (state: StateSchema) =>
    state?.employeesSchema?.searchQuery || "";
