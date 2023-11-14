import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getRegisteredUserId = (state: StateSchema) =>
    state?.user?.registeredUserId ?? "";
