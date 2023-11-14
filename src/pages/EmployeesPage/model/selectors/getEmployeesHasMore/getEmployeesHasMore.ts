import { StateSchema } from "@/app/providers/StoreProvider";

export const getEmployeesHasMore = (state: StateSchema) =>
    state?.employeesPageSchema?.hasMore ?? false;
