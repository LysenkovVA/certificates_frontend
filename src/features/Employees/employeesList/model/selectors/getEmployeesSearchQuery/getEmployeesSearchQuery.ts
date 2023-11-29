import { StateSchema } from "@/app/providers/StoreProvider";

export const getEmployeesListSearchQuery = (state: StateSchema) =>
    state?.employeesPageSchema?.searchQuery ?? "";
