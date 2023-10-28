import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getSignUpIsLoading = (state: StateSchema) =>
    state?.signUp?.isLoading || false;
