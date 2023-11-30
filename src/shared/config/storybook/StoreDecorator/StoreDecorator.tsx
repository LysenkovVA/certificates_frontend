import { StateSchema } from "@/app/providers/StoreProvider";
import StoreProvider from "@/app/providers/StoreProvider/ui/StoreProvider";
import { userReducer } from "@/entities/User/model/slice/userSlice";
import { employeeDetailsReducer } from "@/features/Employees/employeeDetailsCard/model/slice/employeeDetailsSlice";
import { employeesPageReducer } from "@/features/Employees/employeesList/model/slice/employeesPageSlice";
import { authReducer } from "@/features/auth/model/slice/authSlice";
import { signUpReducer } from "@/features/signUp";
import { ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

// Дефолтные редюсеры для сторибука
const defaultAsyncReducers: ReducersList = {
    authSchema: authReducer,
    signUpSchema: signUpReducer,
    userSchema: userReducer,
    employeesPageSchema: employeesPageReducer,
    employeeDetailsSchema: employeeDetailsReducer,
};

export const StoreDecorator = (
    state: StateSchema,
    Story?: any,
    asyncReducers?: ReducersList,
) => (
    <StoreProvider
        initialState={state}
        asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
    >
        {Story()}
    </StoreProvider>
);
