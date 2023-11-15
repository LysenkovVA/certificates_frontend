import { IOrganization } from "@/entities/Organization/types/IOrganization";

export interface IDepartment {
    id: string;
    name: string;
    organization: IOrganization;
}
