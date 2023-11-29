import { Employee } from "@/entities/Employee";

export interface EmployeeDetailsSchema {
    isLoading?: boolean;
    error?: string;
    employeeDetails?: Employee;
    employeeDetailsForm?: Employee;
    _isInited?: boolean;
}
