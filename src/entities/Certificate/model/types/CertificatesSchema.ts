import { ICertificate } from "@/entities/Certificate/model/types/ICertificate";
import { EntityState } from "@reduxjs/toolkit";

export interface CertificatesSchema extends EntityState<ICertificate> {
    isLoading?: boolean;
    error?: string;
    limit: number;
    offset: number;
    hasMore: boolean;
    _isInited: boolean;
}
