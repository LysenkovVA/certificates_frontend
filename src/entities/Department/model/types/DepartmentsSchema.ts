import { IDepartment } from "@/entities/Department/model/types/IDepartment";
import { EntityState } from "@reduxjs/toolkit";

export interface DepartmentsSchema extends EntityState<IDepartment> {
    isLoading?: boolean;
    error?: string;
    limit: number;
    offset: number;
    hasMore: boolean;
    _isInited: boolean;
}
