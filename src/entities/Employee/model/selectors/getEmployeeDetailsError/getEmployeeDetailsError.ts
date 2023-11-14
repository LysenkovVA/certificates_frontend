import { StateSchema } from "@/app/providers/StoreProvider";

export const getEmployeeDetailsError = (state: StateSchema) =>
    state.employeeDetailsSchema?.error ?? "";
