export interface IUser {
    id: string;
    email: string;
    token: string;
    surname?: string;
    name?: string;
    patronymic?: string;
    birthDate?: Date;
    avatar?: string;
}
