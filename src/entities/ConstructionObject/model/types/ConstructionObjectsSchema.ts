import { IConstructionObject } from "@/entities/ConstructionObject/model/types/IConstructionObject";
import { EntityState } from "@reduxjs/toolkit";

export interface ConstructionObjectsSchema
    extends EntityState<IConstructionObject> {
    isLoading?: boolean;
    error?: string;
    limit: number;
    offset: number;
    hasMore: boolean;
    _isInited: boolean;
}
