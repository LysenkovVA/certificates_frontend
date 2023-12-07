import { StateSchema } from "@/app/providers/StoreProvider";

export const getEmployeeDetails = (state: StateSchema) =>
    state.employeeDetailsSchema?.employeeDetails ?? undefined;

export const getEmployeeDetailsForm = (state: StateSchema) =>
    state.employeeDetailsSchema?.employeeDetailsForm ?? undefined;

export const getEmployeeDetailsFormBerth = (state: StateSchema) =>
    state.employeeDetailsSchema?.employeeDetailsForm?.berth ?? undefined;

export const getEmployeeDetailsIsInitialized = (state: StateSchema) =>
    state.employeeDetailsSchema?._isInitialized ?? false;

export const getEmployeeAvatar = (state: StateSchema) =>
    state.employeeDetailsSchema?.avatar ?? "";
