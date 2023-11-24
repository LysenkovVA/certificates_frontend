// Схема данных приложения
import { EmployeeDetailsSchema } from "@/entities/Employee/model/types/EmployeeDetailsSchema";
import { OrganizationsSchema } from "@/entities/Organization";
import { ProfileSchema } from "@/entities/Profile/model/types/ProfileSchema";
import { UserSchema } from "@/entities/User/model/types/UserSchema";
import { AuthSchema } from "@/features/auth/model/types/AuthSchema";
import { SignUpSchema } from "@/features/signUp/model/types/SignUpSchema";
import { EmployeesPageSchema } from "@/pages/EmployeesPage/model/types/EmployeesPageSchema";
import {
    AnyAction,
    CombinedState,
    Reducer,
    ReducersMapObject,
} from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { AxiosInstance } from "axios";

export interface StateSchema {
    userShema: UserSchema;
    employeesPageSchema?: EmployeesPageSchema;
    // Асинхронные редюсеры
    authSchema?: AuthSchema;
    signUpSchema?: SignUpSchema;
    profileSchema?: ProfileSchema;
    employeeDetailsSchema?: EmployeeDetailsSchema;
    organizationsSchema?: OrganizationsSchema;
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
