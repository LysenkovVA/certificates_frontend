import { StateSchema } from "@/app/providers/StoreProvider";

export const getEmployeesListIsInitialized = (state: StateSchema) =>
    state?.employeesPageSchema?._isInitialized ?? false;
