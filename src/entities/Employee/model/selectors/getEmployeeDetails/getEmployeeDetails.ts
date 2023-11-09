import { StateSchema } from "@/app/providers/StoreProvider";

export const getEmployeeDetails = (state: StateSchema) =>
    state.employeeDetailsSchema?.data || {};
