// Схема данных приложения
import { UserSchema } from "@/entities/User/model/types/UserSchema";
import { AuthSchema } from "@/features/auth/model/types/AuthSchema";
import { SignUpSchema } from "@/features/signUp/model/types/SignUpSchema";

export interface StateSchema {
    user: UserSchema;
    auth: AuthSchema;
    signUp: SignUpSchema;
}
