import { StateSchema } from "@/app/providers/StoreProvider";
import { inspectionsAdapter } from "../adapter/inspectionsAdapter";

export const getInspections = inspectionsAdapter.getSelectors<StateSchema>(
    (state) => state.inspectionsSchema ?? inspectionsAdapter.getInitialState(),
);

export const getInspectionsIsLoading = (state: StateSchema) =>
    state?.inspectionsSchema?.isLoading ?? false;

export const getInspectionsError = (state: StateSchema) =>
    state?.inspectionsSchema?.error ?? "";

export const getInspectionsLimit = (state: StateSchema) =>
    state?.inspectionsSchema?.limit ?? 10;

export const getInspectionsOffset = (state: StateSchema) =>
    state?.inspectionsSchema?.offset ?? 0;

export const getInspectionsHasMore = (state: StateSchema) =>
    state?.inspectionsSchema?.hasMore ?? false;

export const getInspectionsIsInited = (state: StateSchema) =>
    state?.inspectionsSchema?._isInited ?? false;
