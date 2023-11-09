import { StateSchema } from "@/app/providers/StoreProvider";

export const getEmployeeDetailsIsLoading = (state: StateSchema) =>
    state.employeeDetailsSchema?.isLoading || false;
