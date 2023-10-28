import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getSignUpEmail = (state: StateSchema) =>
    state?.signUp?.email || "";
