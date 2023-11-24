import { IOrganization } from "@/entities/Organization/model/types/IOrganization";
import { EntityState } from "@reduxjs/toolkit";

export interface OrganizationsSchema extends EntityState<IOrganization> {
    isLoading?: boolean;
    error?: string;
    limit: number;
    offset: number;
    hasMore: boolean;
    _isInited: boolean;
}
