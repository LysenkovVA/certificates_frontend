import { StateSchema } from "@/app/providers/StoreProvider";

export const getEmployeesIsInitialized = (state: StateSchema) =>
    state?.employeesPageSchema?._isInitialized ?? false;
