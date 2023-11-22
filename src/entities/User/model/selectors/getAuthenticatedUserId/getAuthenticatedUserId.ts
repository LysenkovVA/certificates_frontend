import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getAuthenticatedUserId = (state: StateSchema) =>
    state?.userShema?.authenticatedUser?.id ?? "";
