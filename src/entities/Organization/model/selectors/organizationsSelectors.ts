import { StateSchema } from "@/app/providers/StoreProvider";
import { organizationsAdapter } from "../adapter/organizationsAdapter";

export const getOrganizations = organizationsAdapter.getSelectors<StateSchema>(
    (state) =>
        state.organizationsSchema ?? organizationsAdapter.getInitialState(),
);

export const getOrganizationsIsLoading = (state: StateSchema) =>
    state?.organizationsSchema?.isLoading ?? false;

export const getOrganizationsError = (state: StateSchema) =>
    state?.organizationsSchema?.error ?? "";

export const getOrganizationsLimit = (state: StateSchema) =>
    state?.organizationsSchema?.limit ?? 10;

export const getOrganizationsOffset = (state: StateSchema) =>
    state?.organizationsSchema?.offset ?? 0;

export const getOrganizationsHasMore = (state: StateSchema) =>
    state?.organizationsSchema?.hasMore ?? false;

export const getOrganizationsIsInited = (state: StateSchema) =>
    state?.organizationsSchema?._isInited ?? false;
