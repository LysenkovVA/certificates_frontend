import { IOrganization } from "@/entities/Organization";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const organizationsAdapter = createEntityAdapter<IOrganization>({
    selectId: (organization) => organization.id,
});
