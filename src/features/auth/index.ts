export { getAuth } from "@/features/auth/model/selectors/getAuth/getAuth";
export { authByEmail } from "@/features/auth/model/services/authByEmail/authByEmail";
export {
    authActions,
    authReducer,
    authSlice,
} from "@/features/auth/model/slice/authSlice";
export type { AuthSchema } from "@/features/auth/model/types/AuthSchema";
