import { StateSchema } from "@/app/providers/StoreProvider";

export const getEmployeesIsLoading = (state: StateSchema) =>
    state?.employeesPageSchema?.isLoading ?? false;
