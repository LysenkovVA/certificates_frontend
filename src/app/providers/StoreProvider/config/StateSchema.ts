// Схема данных приложения
import { UserSchema } from "@/entities/User/model/types/UserSchema";
import { AuthSchema } from "@/features/auth/model/types/AuthSchema";

export interface StateSchema {
    user: UserSchema;
    auth: AuthSchema;
}
