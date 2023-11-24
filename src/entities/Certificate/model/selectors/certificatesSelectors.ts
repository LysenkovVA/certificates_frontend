import { StateSchema } from "@/app/providers/StoreProvider";
import { certificatesAdapter } from "../adapter/certificatesAdapter";

export const getCertificates = certificatesAdapter.getSelectors<StateSchema>(
    (state) =>
        state.certificatesSchema ?? certificatesAdapter.getInitialState(),
);

export const getCertificatesIsLoading = (state: StateSchema) =>
    state?.certificatesSchema?.isLoading ?? false;

export const getCertificatesError = (state: StateSchema) =>
    state?.certificatesSchema?.error ?? "";

export const getCertificatesLimit = (state: StateSchema) =>
    state?.certificatesSchema?.limit ?? 10;

export const getCertificatesOffset = (state: StateSchema) =>
    state?.certificatesSchema?.offset ?? 0;

export const getCertificatesHasMore = (state: StateSchema) =>
    state?.certificatesSchema?.hasMore ?? false;

export const getCertificatesIsInited = (state: StateSchema) =>
    state?.certificatesSchema?._isInited ?? false;
