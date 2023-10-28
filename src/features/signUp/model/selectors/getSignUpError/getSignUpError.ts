import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getSignUpError = (state: StateSchema) =>
    state?.signUp?.error || "";
