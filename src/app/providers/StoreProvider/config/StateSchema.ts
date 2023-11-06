// Схема данных приложения
import { UserSchema } from "@/entities/User/model/types/UserSchema";
import { AuthSchema } from "@/features/auth/model/types/AuthSchema";
import { SignUpSchema } from "@/features/signUp/model/types/SignUpSchema";
import {
    AnyAction,
    CombinedState,
    Reducer,
    ReducersMapObject,
} from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { To } from "@remix-run/router";
import { AxiosInstance } from "axios";
import { NavigateOptions } from "react-router/dist/lib/context";

export interface StateSchema {
    user: UserSchema;

    // Асинхронные редюсеры
    auth?: AuthSchema;
    signUp?: SignUpSchema;
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
    navigate: ((to: To, options?: NavigateOptions) => void) | undefined;
}

export interface ThunkConfig<T> {
    // Переопределяем стандартные типы конфига
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
