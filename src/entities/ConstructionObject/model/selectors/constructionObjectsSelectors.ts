import { StateSchema } from "@/app/providers/StoreProvider";
import { constructionObjectsAdapter } from "../adapter/constructionObjectsAdapter";

export const getConstructionObjects =
    constructionObjectsAdapter.getSelectors<StateSchema>(
        (state) =>
            state.constructionObjectsSchema ??
            constructionObjectsAdapter.getInitialState(),
    );

export const getConstructionObjectsIsLoading = (state: StateSchema) =>
    state?.constructionObjectsSchema?.isLoading ?? false;

export const getConstructionObjectsError = (state: StateSchema) =>
    state?.constructionObjectsSchema?.error ?? "";

export const getConstructionObjectsLimit = (state: StateSchema) =>
    state?.constructionObjectsSchema?.limit ?? 10;

export const getConstructionObjectsOffset = (state: StateSchema) =>
    state?.constructionObjectsSchema?.offset ?? 0;

export const getConstructionObjectsHasMore = (state: StateSchema) =>
    state?.constructionObjectsSchema?.hasMore ?? false;

export const getConstructionObjectsIsInited = (state: StateSchema) =>
    state?.constructionObjectsSchema?._isInited ?? false;
