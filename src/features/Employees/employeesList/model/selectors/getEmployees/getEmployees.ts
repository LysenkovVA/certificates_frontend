import { StateSchema } from "@/app/providers/StoreProvider";

import { employeesPageAdapter } from "../../adapter/employeesPageAdapter";

export const getEmployeesList = employeesPageAdapter.getSelectors<StateSchema>(
    (state) =>
        state.employeesPageSchema ?? employeesPageAdapter.getInitialState(),
);
