import { IOrganization } from "@/entities/Organization";

export interface IConstructionObject {
    id: string;
    name: string;
    address?: string;
    startDate?: Date;
    endDate?: Date;
    organization?: IOrganization;
}
