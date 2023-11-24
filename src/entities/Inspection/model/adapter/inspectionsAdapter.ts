import { IInspection } from "@/entities/Inspection";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const inspectionsAdapter = createEntityAdapter<IInspection>({
    selectId: (inspection) => inspection.id,
});
