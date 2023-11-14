import { StateSchema } from "@/app/providers/StoreProvider";

export const getEmployeesSearchQuery = (state: StateSchema) =>
    state?.employeesPageSchema?.searchQuery ?? "";
