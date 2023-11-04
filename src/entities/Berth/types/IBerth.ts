import { IBerthType } from "@/entities/BerthType/types/IBerthType";

export interface IBerth {
    id: string;
    value: string;
    berthType: IBerthType;
}
