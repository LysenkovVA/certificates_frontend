import { StateSchema } from "@/app/providers/StoreProvider";

export const getEmployeesListError = (state: StateSchema) =>
    state?.employeesPageSchema?.error ?? "";
