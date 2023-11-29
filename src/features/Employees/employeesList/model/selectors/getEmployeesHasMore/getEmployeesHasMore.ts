import { StateSchema } from "@/app/providers/StoreProvider";

export const getEmployeeListsHasMore = (state: StateSchema) =>
    state?.employeesPageSchema?.hasMore ?? false;
