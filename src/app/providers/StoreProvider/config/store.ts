import { userReducer } from "@/entities/User/model/slice/userSlice";
import $api from "@/shared/api/axios";
import {
    CombinedState,
    configureStore,
    Reducer,
    ReducersMapObject,
} from "@reduxjs/toolkit";
import { createReducerManager } from "./reducerManager";
import { StateSchema, ThunkExtraArg } from "./StateSchema";

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        userSchema: userReducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const extraArg: ThunkExtraArg = {
        api: $api,
    };

    // TODO:  убрал тут дженерик configureStore<StateSchema> чтобы не ругалось на middleware
    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        // Отключаем devtools для production
        devTools: __IS_DEV__,
        preloadedState: initialState,
        // Чтобы использовать аргумент extra в thunkApi
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArg,
                },
            }),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

// Типизированные dispatch и getState
export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
export type RootState = ReturnType<typeof createReduxStore>["getState"];
