import { IEmployee } from "@/entities/Employee/model/types/IEmployee";
import { EntityState } from "@reduxjs/toolkit";

export interface EmployeesPageSchema extends EntityState<IEmployee> {
    isLoading?: boolean;
    error?: string;
    // page
    searchQuery?: string;
}
