import { StateSchema } from "@/app/providers/StoreProvider";

export const getEmployeesListLimit = (state: StateSchema) =>
    state?.employeesPageSchema?.limit ?? 10;
