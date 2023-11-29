import { Department } from "@/entities/Department";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const departmentsListAdapter = createEntityAdapter<Department>({
    selectId: (department) => department.id,
});
