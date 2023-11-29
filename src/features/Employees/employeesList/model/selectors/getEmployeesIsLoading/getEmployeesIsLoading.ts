import { StateSchema } from "@/app/providers/StoreProvider";

export const getEmployeesListIsLoading = (state: StateSchema) =>
    state?.employeesPageSchema?.isLoading ?? false;
