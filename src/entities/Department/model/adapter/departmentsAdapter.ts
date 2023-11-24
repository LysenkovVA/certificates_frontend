import { IDepartment } from "@/entities/Department/model/types/IDepartment";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const departmentsAdapter = createEntityAdapter<IDepartment>({
    selectId: (department) => department.id,
});
