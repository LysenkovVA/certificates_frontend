import { IUser } from "@/entities/User";

export interface ISignUp {
    user: IUser;
    accessToken: string;
    refreshToken: string;
}
