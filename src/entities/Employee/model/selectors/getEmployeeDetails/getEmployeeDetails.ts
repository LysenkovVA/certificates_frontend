import { StateSchema } from "@/app/providers/StoreProvider";

export const getEmployeeDetails = (state: StateSchema) =>
    state.employeeDetailsSchema?.employeeDetails ?? undefined;

export const getEmployeeDetailsForm = (state: StateSchema) =>
    state.employeeDetailsSchema?.employeeDetailsForm ?? undefined;

export const getEmployeeDetailsIsInited = (state: StateSchema) =>
    state.employeeDetailsSchema?._isInited ?? false;
