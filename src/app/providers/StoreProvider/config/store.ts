import { userReducer } from "@/entities/User/model/slice/userSlice";
import { authReducer } from "@/features/auth";
import { configureStore } from "@reduxjs/toolkit";
import { StateSchema } from "./StateSchema";

export function createReduxStore(initialState?: StateSchema) {
    return configureStore<StateSchema>({
        reducer: { user: userReducer, auth: authReducer },
        // Отключаем devtools для production
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });
}

// попытка с asyncThunk
const store = createReduxStore();
export type AppDispatch = typeof store.dispatch;
