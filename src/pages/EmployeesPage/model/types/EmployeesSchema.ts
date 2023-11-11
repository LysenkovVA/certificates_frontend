import { IEmployee } from "@/entities/Employee/model/types/IEmployee";
import { EntityState } from "@reduxjs/toolkit";

export interface EmployeesSchema extends EntityState<IEmployee> {
    // employees: IEmployee[];
    isLoading?: boolean;
    error?: string;
    // page
    searchQuery?: string;
}
