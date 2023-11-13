import { StateSchema } from "@/app/providers/StoreProvider";

import { employeesPageAdapter } from "@/pages/EmployeesPage/model/adapter/employeesPageAdapter";

export const getEmployees = employeesPageAdapter.getSelectors<StateSchema>(
    (state) =>
        state.employeesPageSchema ?? employeesPageAdapter.getInitialState(),
);

export const getEmployeesIsLoading = (state: StateSchema) =>
    state?.employeesPageSchema?.isLoading ?? false;

export const getEmployeesError = (state: StateSchema) =>
    state?.employeesPageSchema?.error ?? "";

export const getEmployeesLimit = (state: StateSchema) =>
    state?.employeesPageSchema?.limit ?? 10;

export const getEmployeesOffset = (state: StateSchema) =>
    state?.employeesPageSchema?.offset ?? 0;

export const getEmployeesHasMore = (state: StateSchema) =>
    state?.employeesPageSchema?.hasMore ?? false;

export const getEmployeesSearchQuery = (state: StateSchema) =>
    state?.employeesPageSchema?.searchQuery ?? "";

export const getEmployeesIsInitialized = (state: StateSchema) =>
    state?.employeesPageSchema?._isInitialized ?? false;
