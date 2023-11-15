import { ICertificateType } from "@/entities/CertificateType/types/ICertificateType";
import { IEmployee } from "@/entities/Employee/model/types/IEmployee";

export interface ICertificate {
    id?: string;
    number?: string;
    startDate?: Date;
    group?: string;
    certificateType?: ICertificateType;
    employee?: IEmployee;
}
