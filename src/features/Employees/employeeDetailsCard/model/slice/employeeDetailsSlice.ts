import { Berth } from "@/entities/Berth/types/Berth";
import { Department } from "@/entities/Department/model/types/Department";
import { Employee } from "@/entities/Employee/model/types/Employee";
import { fetchEmployeeDetailsById } from "@/features/Employees/employeeDetailsCard/model/services/fetchEmployeeDetailsById/fetchEmployeeDetailsById";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateEmployeeDetailsById } from "../services/updateEmployeeDetailsById/updateEmployeeDetailsById";
import { EmployeeDetailsSchema } from "../types/EmployeeDetailsSchema";

const initialState: EmployeeDetailsSchema = {
    isLoading: false,
    error: undefined,
    employeeDetails: undefined,
    employeeDetailsForm: undefined,
    _isInitialized: false,
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
        setFormBerth: (state, action: PayloadAction<Berth | undefined>) => {
            if (state?.employeeDetailsForm) {
                state.employeeDetailsForm.berth = action.payload;
            }
        },
        setFormDepartment: (
            state,
            action: PayloadAction<Department | undefined>,
        ) => {
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
        setFormAvatar: (state, action: PayloadAction<string | undefined>) => {
            if (state?.employeeDetailsForm) {
                state.avatar = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeeDetailsById.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                fetchEmployeeDetailsById.fulfilled,
                (state, action: PayloadAction<Employee>) => {
                    state.isLoading = false;

                    state.employeeDetails = action.payload;
                    state.employeeDetailsForm = action.payload;
                    state._isInitialized = true;
                },
            )
            .addCase(fetchEmployeeDetailsById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateEmployeeDetailsById.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                updateEmployeeDetailsById.fulfilled,
                (state, action: PayloadAction<Employee>) => {
                    state.isLoading = false;

                    state.employeeDetails = action.payload;
                    state.employeeDetailsForm = action.payload;
                    state._isInitialized = true;
                },
            )
            .addCase(updateEmployeeDetailsById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: employeeDetailsActions } = employeeDetailsSlice;
export const { reducer: employeeDetailsReducer } = employeeDetailsSlice;
