import { IProfile } from "@/entities/Profile/model/types/IProfile";

export interface IUser {
    id?: string;
    email?: string;
    token?: string;
    profile?: IProfile;
}
