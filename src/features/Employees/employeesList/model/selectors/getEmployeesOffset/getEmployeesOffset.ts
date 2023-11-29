import { StateSchema } from "@/app/providers/StoreProvider";

export const getEmployeesListOffset = (state: StateSchema) =>
    state?.employeesPageSchema?.offset ?? 0;
