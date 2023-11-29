import { StateSchema } from "@/app/providers/StoreProvider";
import { organizationsListAdapter } from "../adapter/organizationsListAdapter";

export const getOrganizationsList =
    organizationsListAdapter.getSelectors<StateSchema>(
        (state) =>
            state.organizationsSchema ??
            organizationsListAdapter.getInitialState(),
    );

export const getOrganizationsListIsLoading = (state: StateSchema) =>
    state?.organizationsSchema?.isLoading ?? false;

export const getOrganizationsListError = (state: StateSchema) =>
    state?.organizationsSchema?.error ?? "";

export const getOrganizationsListLimit = (state: StateSchema) =>
    state?.organizationsSchema?.limit ?? 10;

export const getOrganizationsListOffset = (state: StateSchema) =>
    state?.organizationsSchema?.offset ?? 0;

export const getOrganizationsListHasMore = (state: StateSchema) =>
    state?.organizationsSchema?.hasMore ?? false;

export const getOrganizationsListIsInitialized = (state: StateSchema) =>
    state?.organizationsSchema?._isInitialized ?? false;
