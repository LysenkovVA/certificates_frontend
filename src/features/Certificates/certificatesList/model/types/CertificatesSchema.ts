import { Certificate } from "@/entities/Certificate/model/types/Certificate";
import { EntityState } from "@reduxjs/toolkit";

export interface CertificatesSchema extends EntityState<Certificate> {
    isLoading?: boolean;
    error?: string;
    limit: number;
    offset: number;
    hasMore: boolean;
    _isInitialized: boolean;
}
