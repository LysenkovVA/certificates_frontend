import { IBerth } from "@/entities/Berth/types/IBerth";
import { ICertificate } from "@/entities/Certificate/model/types/ICertificate";
import { IDepartment } from "@/entities/Department/types/IDepartment";

export interface IEmployee {
    id: string;
    surname?: string;
    name?: string;
    hireDate?: string;
    dismissDate?: string;
    rank?: string;
    berth?: IBerth;
    department?: IDepartment;
    // user?: IUser;
    certificates?: ICertificate[];
}
