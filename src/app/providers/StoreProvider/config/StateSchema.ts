// Схема данных приложения
import { EmployeeDetailsSchema } from "@/entities/Employee/model/types/EmployeeDetailsSchema";
import { ProfileSchema } from "@/entities/Profile/model/types/ProfileSchema";
import { UserSchema } from "@/entities/User/model/types/UserSchema";
import { CertificatesSchema } from "@/features/Certificates/certificatesList";
import { ConstructionObjectsSchema } from "@/features/ConstructionObjects/constructionObjectsList";

import { DepartmentsSchema } from "@/features/Departments/departmentsList";
import { EmployeesPageSchema } from "@/features/Employees/employeesList";
import { InspectionsSchema } from "@/features/Inspections/inspectionsList";
import { OrganizationsSchema } from "@/features/Organizations/organizationsList/model/types/OrganizationsSchema";
import { UISchema } from "@/features/UI";
import { AuthSchema } from "@/features/auth";
import { LogoutSchema } from "@/features/logout/model/types/LogoutSchema";
import { SignUpSchema } from "@/features/signUp/model/types/SignUpSchema";
import {
    AnyAction,
    CombinedState,
    Reducer,
    ReducersMapObject,
} from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { AxiosInstance } from "axios";

export interface StateSchema {
    userSchema: UserSchema;
    ui: UISchema;
    employeesPageSchema?: EmployeesPageSchema;
    // Асинхронные редюсеры
    authSchema?: AuthSchema;
    logoutSchema?: LogoutSchema;
    signUpSchema?: SignUpSchema;
    profileSchema?: ProfileSchema;
    employeeDetailsSchema?: EmployeeDetailsSchema;
    organizationsSchema?: OrganizationsSchema;
    departmentsSchema?: DepartmentsSchema;
    constructionObjectsSchema?: ConstructionObjectsSchema;
    certificatesSchema?: CertificatesSchema;
    inspectionsSchema?: InspectionsSchema;
}

// Для автокоплита
export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (
        state: StateSchema,
        action: AnyAction,
    ) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

// Тип для стора с менеджером
// TODO: extends EnhancedStore?
export interface ReduxStoreWithManager extends ToolkitStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    // Переопределяем стандартные типы конфига
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
