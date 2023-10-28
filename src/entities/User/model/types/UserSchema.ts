import { IUser } from "./IUser";

export interface UserSchema {
    authenticatedUser?: IUser;
    registeredUserId?: string;
}
