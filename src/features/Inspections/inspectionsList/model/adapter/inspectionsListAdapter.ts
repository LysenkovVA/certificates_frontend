import { Inspection } from "@/entities/Inspection";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const inspectionsListAdapter = createEntityAdapter<Inspection>({
    selectId: (inspection) => inspection.id,
});
