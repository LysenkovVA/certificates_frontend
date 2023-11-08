import { IEmployee } from "@/entities/Employee/model/types/IEmployee";

export interface EmployeesSchema {
    employees: IEmployee[];
    isLoading?: boolean;
    error?: string;
}
