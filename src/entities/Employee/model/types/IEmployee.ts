import { IBerth } from "@/entities/Berth/types/IBerth";
import { IDepartment } from "@/entities/Department/types/IDepartment";

export interface IEmployee {
    id: string;
    surname?: string;
    name?: string;
    hireDate?: string;
    dismissDate?: string;
    rank?: string;
    department?: IDepartment;
    berth?: IBerth;
}
