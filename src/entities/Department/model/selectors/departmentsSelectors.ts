import { StateSchema } from "@/app/providers/StoreProvider";
import { departmentsAdapter } from "../adapter/departmentsAdapter";

export const getDepartments = departmentsAdapter.getSelectors<StateSchema>(
    (state) => state.departmentsSchema ?? departmentsAdapter.getInitialState(),
);

export const getDepartmentsIsLoading = (state: StateSchema) =>
    state?.departmentsSchema?.isLoading ?? false;

export const getDepartmentsError = (state: StateSchema) =>
    state?.departmentsSchema?.error ?? "";

export const getDepartmentsLimit = (state: StateSchema) =>
    state?.departmentsSchema?.limit ?? 10;

export const getDepartmentsOffset = (state: StateSchema) =>
    state?.departmentsSchema?.offset ?? 0;

export const getDepartmentsHasMore = (state: StateSchema) =>
    state?.departmentsSchema?.hasMore ?? false;

export const getDepartmentsIsInited = (state: StateSchema) =>
    state?.departmentsSchema?._isInited ?? false;
