import { StateSchema } from "@/app/providers/StoreProvider";
import { certificatesListAdapter } from "../adapter/certificatesListAdapter";

export const getCertificatesList =
    certificatesListAdapter.getSelectors<StateSchema>(
        (state) =>
            state.certificatesSchema ??
            certificatesListAdapter.getInitialState(),
    );

export const getCertificatesListIsLoading = (state: StateSchema) =>
    state?.certificatesSchema?.isLoading ?? false;

export const getCertificatesListError = (state: StateSchema) =>
    state?.certificatesSchema?.error ?? "";

export const getCertificatesListLimit = (state: StateSchema) =>
    state?.certificatesSchema?.limit ?? 10;

export const getCertificatesListOffset = (state: StateSchema) =>
    state?.certificatesSchema?.offset ?? 0;

export const getCertificatesListHasMore = (state: StateSchema) =>
    state?.certificatesSchema?.hasMore ?? false;

export const getCertificatesListIsInitialized = (state: StateSchema) =>
    state?.certificatesSchema?._isInitialized ?? false;
