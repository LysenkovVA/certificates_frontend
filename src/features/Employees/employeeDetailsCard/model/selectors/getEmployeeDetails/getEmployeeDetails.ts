import { StateSchema } from "@/app/providers/StoreProvider";

export const getEmployeeDetails = (state: StateSchema) =>
    state.employeeDetailsSchema?.employeeDetails ?? undefined;

export const getEmployeeDetailsForm = (state: StateSchema) =>
    state.employeeDetailsSchema?.employeeDetailsForm ?? undefined;

export const getEmployeeDetailsIsInitialized = (state: StateSchema) =>
    state.employeeDetailsSchema?._isInitialized ?? false;
