import { userReducer } from "@/entities/User/model/slice/userSlice";
import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { createReducerManager } from "./reducerManager";
import { StateSchema } from "./StateSchema";

export function createReduxStore(initialState?: StateSchema) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        user: userReducer,
        // auth: authReducer,
        // signUp: signUpReducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const store = configureStore<StateSchema>({
        reducer: reducerManager.reduce,
        // Отключаем devtools для production
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

// Типизированные dispatch и getState
export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
export type RootState = ReturnType<typeof createReduxStore>["getState"];
