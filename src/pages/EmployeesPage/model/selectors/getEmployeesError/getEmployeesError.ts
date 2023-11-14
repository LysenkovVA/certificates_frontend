import { StateSchema } from "@/app/providers/StoreProvider";

export const getEmployeesError = (state: StateSchema) =>
    state?.employeesPageSchema?.error ?? "";
