import { Organization } from "@/entities/Organization";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const organizationsListAdapter = createEntityAdapter<Organization>({
    selectId: (organization) => organization.id,
});
