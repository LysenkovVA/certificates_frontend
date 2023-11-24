import { IInspection } from "@/entities/Inspection/model/types/IInspection";
import { EntityState } from "@reduxjs/toolkit";

export interface InspectionsSchema extends EntityState<IInspection> {
    isLoading?: boolean;
    error?: string;
    limit: number;
    offset: number;
    hasMore: boolean;
    _isInited: boolean;
}
