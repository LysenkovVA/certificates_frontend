import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";

export const getProfileFormData = createSelector(
    (state: StateSchema) => state?.profileSchema?.profileFormData ?? {},
    (data) => data,
);
