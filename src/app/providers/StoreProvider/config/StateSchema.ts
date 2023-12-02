// Схема данных приложения
import { ProfileSchema } from "@/entities/Profile/model/types/ProfileSchema";
import { UserSchema } from "@/entities/User/model/types/UserSchema";
import { CertificatesInfiniteListSchema } from "@/features/Certificates/certificatesList";
import { ConstructionObjectsInfiniteListSchema } from "@/features/ConstructionObjects/constructionObjectsList";

import { AllBerthesSchema } from "@/features/Berthes/berthSelector";
import { DepartmentsInfiniteListSchema } from "@/features/Departments/departmentsList";
import { EmployeeDetailsSchema } from "@/features/Employees/employeeDetailsCard";
import { EmployeesInfiniteListSchema } from "@/features/Employees/employeesList";
import { InspectionsInfiniteListSchema } from "@/features/Inspections/inspectionsList";
import { OrganizationsInfiniteListSchema } from "@/features/Organizations/organizationsList/model/types/OrganizationsInfiniteListSchema";
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
    /**
     * ПОСТОЯННЫЕ РЕДЮСЕРЫ
     */
    userSchema: UserSchema;
    ui: UISchema;

    /**
     * АСИНХРОННЫЕ РЕДЮСЕРЫ
     */
    // ПОЛЬЗОВАТЕЛЬ
    authSchema?: AuthSchema;
    logoutSchema?: LogoutSchema;
    signUpSchema?: SignUpSchema;
    // ПРОФИЛЬ
    profileSchema?: ProfileSchema;
    // ГЛАВНЫЕ СТРАНИЦЫ
    inspectionsInfiniteListSchema?: InspectionsInfiniteListSchema;
    certificatesInfiniteListSchema?: CertificatesInfiniteListSchema;
    organizationsInfiniteListSchema?: OrganizationsInfiniteListSchema;
    constructionObjectsInfiniteListSchema?: ConstructionObjectsInfiniteListSchema;
    departmentsInfiniteListSchema?: DepartmentsInfiniteListSchema;
    employeesInfiniteListSchema?: EmployeesInfiniteListSchema;
    // ДЕТАЛИ РАБОТНИКА
    employeeDetailsSchema?: EmployeeDetailsSchema;
    allBerthesSchema?: AllBerthesSchema;
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
