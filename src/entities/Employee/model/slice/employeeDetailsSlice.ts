import { Berth } from "@/entities/Berth/types/Berth";
import { Department } from "@/entities/Department/model/types/Department";
import { fetchEmployeeById } from "@/entities/Employee/model/services/fetchEmployeeById/fetchEmployeeById";
import { Employee } from "@/entities/Employee/model/types/Employee";
import { EmployeeDetailsSchema } from "@/entities/Employee/model/types/EmployeeDetailsSchema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: EmployeeDetailsSchema = {
    isLoading: false,
    error: undefined,
    employeeDetails: undefined,
    employeeDetailsForm: undefined,
    _isInited: false,
};

export const employeeDetailsSlice = createSlice({
    name: "employeeDetailsSlice",
    initialState,
    reducers: {
        setFormSurname: (state, action: PayloadAction<string>) => {
            if (state?.employeeDetailsForm) {
                state.employeeDetailsForm.surname = action.payload;
            }
        },
        setFormName: (state, action: PayloadAction<string>) => {
            if (state?.employeeDetailsForm) {
                state.employeeDetailsForm.name = action.payload;
            }
        },
        setFormEmail: (state, action: PayloadAction<string>) => {
            if (state?.employeeDetailsForm) {
                state.employeeDetailsForm.email = action.payload;
            }
        },
        setFormBerth: (state, action: PayloadAction<Berth>) => {
            if (state?.employeeDetailsForm) {
                state.employeeDetailsForm.berth = action.payload;
            }
        },
        setFormDepartment: (state, action: PayloadAction<Department>) => {
            if (state?.employeeDetailsForm) {
                state.employeeDetailsForm.department = action.payload;
            }
        },
        setFormHireDate: (state, action: PayloadAction<string>) => {
            if (state?.employeeDetailsForm) {
                state.employeeDetailsForm.hireDate = action.payload;
            }
        },
        setFormDismissDate: (state, action: PayloadAction<string>) => {
            if (state?.employeeDetailsForm) {
                state.employeeDetailsForm.dismissDate = action.payload;
            }
        },
        setFormPhone: (state, action: PayloadAction<string>) => {
            if (state?.employeeDetailsForm) {
                state.employeeDetailsForm.phone = action.payload;
            }
        },
        setFormRank: (state, action: PayloadAction<string>) => {
            if (state?.employeeDetailsForm) {
                state.employeeDetailsForm.rank = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeeById.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                fetchEmployeeById.fulfilled,
                (state, action: PayloadAction<Employee>) => {
                    state.isLoading = false;
                    state.employeeDetails = action.payload;
                    state.employeeDetailsForm = action.payload;
                    state._isInited = true;
                },
            )
            .addCase(fetchEmployeeById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: employeeDetailsActions } = employeeDetailsSlice;
export const { reducer: employeeDetailsReducer } = employeeDetailsSlice;
