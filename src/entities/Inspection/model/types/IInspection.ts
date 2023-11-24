import { IConstructionObject } from "@/entities/ConstructionObject";
import { IInspectionType } from "@/entities/InspectionType";
import { IResultDocumentType } from "@/entities/ResultDocumentType";

export interface IInspection {
    id: string;
    date?: Date;
    isPenalty?: boolean;
    isCommitional?: boolean;
    dateOfElimination?: Date;
    documentNumber?: string;
    documentDate?: Date;
    notes?: string;
    constructionObject?: IConstructionObject;
    inspectionType?: IInspectionType;
    resultDocumentType?: IResultDocumentType;
}
