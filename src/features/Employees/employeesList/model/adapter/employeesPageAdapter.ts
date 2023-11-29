import { Employee } from "@/entities/Employee";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const employeesPageAdapter = createEntityAdapter<Employee>({
    selectId: (employee) => employee.id,
});
