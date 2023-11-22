import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getAuthenticatedUser = (state: StateSchema) =>
    state?.userShema?.authenticatedUser ?? {};
