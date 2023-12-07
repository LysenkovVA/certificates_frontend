import { Employee } from "@/entities/Employee";

export interface EmployeeDetailsSchema {
    isLoading?: boolean;
    error?: string;
    avatar?: string;
    employeeDetails?: Employee;
    employeeDetailsForm?: Employee;
    _isInitialized?: boolean;
}
