import { Berth } from "@/entities/Berth";
import { Certificate } from "@/entities/Certificate";
import { Department } from "@/entities/Department";

export interface Employee {
    id: string;
    surname?: string;
    name?: string;
    hireDate?: string;
    dismissDate?: string;
    rank?: string;
    phone?: string;
    email?: string;
    berth?: Berth;
    department?: Department;
    certificates?: Certificate[];
}
