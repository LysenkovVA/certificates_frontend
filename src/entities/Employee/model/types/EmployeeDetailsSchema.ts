import { IEmployee } from "@/entities/Employee/model/types/IEmployee";

export interface EmployeeDetailsSchema {
    isLoading?: boolean;
    error?: string;
    employeeDetails?: IEmployee;
    employeeDetailsForm?: IEmployee;
    _isInited?: boolean;
}
