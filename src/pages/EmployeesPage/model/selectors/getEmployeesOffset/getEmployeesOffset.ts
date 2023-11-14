import { StateSchema } from "@/app/providers/StoreProvider";

export const getEmployeesOffset = (state: StateSchema) =>
    state?.employeesPageSchema?.offset ?? 0;
