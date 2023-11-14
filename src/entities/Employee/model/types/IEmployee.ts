import { IBerth } from "@/entities/Berth/types/IBerth";
import { IDepartment } from "@/entities/Department/types/IDepartment";
import { IUser } from "@/entities/User/model/types/IUser";

export interface IEmployee {
    id: string;
    surname?: string;
    name?: string;
    hireDate?: string;
    dismissDate?: string;
    rank?: string;
    berth?: IBerth;
    department?: IDepartment;
    user?: IUser;
}
