import { User } from "./User";

export interface UserSchema {
    // Авторизованный пользователь
    authenticatedUser?: User;
    // Только что зарегистрированный пользователь
    registeredUserId?: string;
    isLoading?: boolean;
    error?: string;
    _isInited?: boolean;
}
