import { StateSchema } from "@/app/providers/StoreProvider";
import { constructionObjectsListAdapter } from "../adapter/constructionObjectsListAdapter";

export const getConstructionObjectsList =
    constructionObjectsListAdapter.getSelectors<StateSchema>(
        (state) =>
            state.constructionObjectsSchema ??
            constructionObjectsListAdapter.getInitialState(),
    );

export const getConstructionObjectsListIsLoading = (state: StateSchema) =>
    state?.constructionObjectsSchema?.isLoading ?? false;

export const getConstructionObjectsListError = (state: StateSchema) =>
    state?.constructionObjectsSchema?.error ?? "";

export const getConstructionObjectsListLimit = (state: StateSchema) =>
    state?.constructionObjectsSchema?.limit ?? 10;

export const getConstructionObjectsListOffset = (state: StateSchema) =>
    state?.constructionObjectsSchema?.offset ?? 0;

export const getConstructionObjectsListHasMore = (state: StateSchema) =>
    state?.constructionObjectsSchema?.hasMore ?? false;

export const getConstructionObjectsListIsInitialized = (state: StateSchema) =>
    state?.constructionObjectsSchema?._isInitialized ?? false;
