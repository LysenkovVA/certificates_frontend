import { StateSchema } from "@/app/providers/StoreProvider";
import StoreProvider from "@/app/providers/StoreProvider/ui/StoreProvider";
import { employeeDetailsReducer } from "@/entities/Employee/model/slice/employeeDetailsSlice";
import { userReducer } from "@/entities/User/model/slice/userSlice";
import { authReducer } from "@/features/auth/model/slice/authSlice";
import { signUpReducer } from "@/features/signUp";
import { employeesPageReducer } from "@/pages/EmployeesPage/model/slice/employeesPageSlice";
import { ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

// Дефолтные редюсеры для сторибука
const defaultAsyncReducers: ReducersList = {
    authSchema: authReducer,
    signUpSchema: signUpReducer,
    userShema: userReducer,
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
