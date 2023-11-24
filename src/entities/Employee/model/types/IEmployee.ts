import { IBerth } from "@/entities/Berth/types/IBerth";
import { ICertificate } from "@/entities/Certificate/model/types/ICertificate";
import { IDepartment } from "@/entities/Department/model/types/IDepartment";

export interface IEmployee {
    id: string;
    surname?: string;
    name?: string;
    hireDate?: string;
    dismissDate?: string;
    rank?: string;
    phone?: string;
    email?: string;
    berth?: IBerth;
    department?: IDepartment;
    certificates?: ICertificate[];
}
