import { IEmployee } from "@/entities/Employee/model/types/IEmployee";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const employeesAdapter = createEntityAdapter<IEmployee>({
    selectId: (employee) => employee.id,
});
