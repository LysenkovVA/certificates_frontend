import { ICertificateType } from "@/entities/CertificateType/types/ICertificateType";
import { IEmployee } from "@/entities/Employee/model/types/IEmployee";
import { IFile } from "@/entities/File";

export interface ICertificate {
    id: string;
    number?: string;
    startDate?: Date;
    group?: string;
    certificateType?: ICertificateType;
    employee?: IEmployee;
    scans?: IFile[];
    protocols?: IFile[];
}
