import { StateSchema } from "@/app/providers/StoreProvider";
import { departmentsListAdapter } from "../adapter/departmentsListAdapter";

export const getDepartmentsList =
    departmentsListAdapter.getSelectors<StateSchema>(
        (state) =>
            state.departmentsSchema ?? departmentsListAdapter.getInitialState(),
    );

export const getDepartmentsListIsLoading = (state: StateSchema) =>
    state?.departmentsSchema?.isLoading ?? false;

export const getDepartmentsListError = (state: StateSchema) =>
    state?.departmentsSchema?.error ?? "";

export const getDepartmentsListLimit = (state: StateSchema) =>
    state?.departmentsSchema?.limit ?? 10;

export const getDepartmentsListOffset = (state: StateSchema) =>
    state?.departmentsSchema?.offset ?? 0;

export const getDepartmentsListHasMore = (state: StateSchema) =>
    state?.departmentsSchema?.hasMore ?? false;

export const getDepartmentsListIsInitialized = (state: StateSchema) =>
    state?.departmentsSchema?._isInitialized ?? false;
