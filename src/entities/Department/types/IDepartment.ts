import { IOrganization } from "@/entities/Organization/model/types/IOrganization";

export interface IDepartment {
    id: string;
    name: string;
    organization: IOrganization;
}
