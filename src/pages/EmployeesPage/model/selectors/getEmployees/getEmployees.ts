import { StateSchema } from "@/app/providers/StoreProvider";

export const getEmployees = (state: StateSchema) =>
    state?.employeesSchema?.employees || [];

export const getEmployeesIsLoading = (state: StateSchema) =>
    state?.employeesSchema?.isLoading || false;

export const getEmployeesError = (state: StateSchema) =>
    state?.employeesSchema?.error || "";
