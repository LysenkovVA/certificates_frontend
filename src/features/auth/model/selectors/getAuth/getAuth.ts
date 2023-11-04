import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getAuth = (state: StateSchema) => state?.auth || {};
