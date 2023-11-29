import { StateSchema } from "@/app/providers/StoreProvider";
import { inspectionsListAdapter } from "../adapter/inspectionsListAdapter";

export const getInspectionsList =
    inspectionsListAdapter.getSelectors<StateSchema>(
        (state) =>
            state.inspectionsSchema ?? inspectionsListAdapter.getInitialState(),
    );

export const getInspectionsListIsLoading = (state: StateSchema) =>
    state?.inspectionsSchema?.isLoading ?? false;

export const getInspectionsListError = (state: StateSchema) =>
    state?.inspectionsSchema?.error ?? "";

export const getInspectionsListLimit = (state: StateSchema) =>
    state?.inspectionsSchema?.limit ?? 10;

export const getInspectionListOffset = (state: StateSchema) =>
    state?.inspectionsSchema?.offset ?? 0;

export const getInspectionsListHasMore = (state: StateSchema) =>
    state?.inspectionsSchema?.hasMore ?? false;

export const getInspectionsListIsInitialized = (state: StateSchema) =>
    state?.inspectionsSchema?._isInitialized ?? false;
