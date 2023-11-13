import { IEmployee } from "@/entities/Employee/model/types/IEmployee";
import { EntityState } from "@reduxjs/toolkit";

export interface EmployeesPageSchema extends EntityState<IEmployee> {
    isLoading?: boolean;
    error?: string;
    // pagination
    limit: number;
    offset: number;
    hasMore: boolean;

    // filters
    searchQuery?: string;

    _isInitialized: boolean;
}
