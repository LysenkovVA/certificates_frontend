import { IUser } from "@/entities/User";

export interface IAuth {
    user: IUser;
    accessToken: string;
    refreshToken: string;
}
