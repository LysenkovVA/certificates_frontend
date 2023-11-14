import { StateSchema } from "@/app/providers/StoreProvider";

import { employeesPageAdapter } from "@/pages/EmployeesPage/model/adapter/employeesPageAdapter";

export const getEmployees = employeesPageAdapter.getSelectors<StateSchema>(
    (state) =>
        state.employeesPageSchema ?? employeesPageAdapter.getInitialState(),
);
