import { IFile } from "@/entities/File";
import { IUser } from "@/entities/User";

export interface IProfile {
    id?: string;
    surname?: string;
    name?: string;
    patronymic?: string;
    birthDate?: string;
    avatar?: IFile;
    user?: IUser;
}
