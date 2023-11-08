import { IUser } from "./IUser";

export interface UserSchema {
    // Авторизованный пользователь
    authenticatedUser?: IUser;
    // Профиль пользователя
    userProfile?: IUser;
    // Только что зарегистрированный пользователь
    registeredUserId?: string;
    isLoading?: boolean;
    error?: string;
}
