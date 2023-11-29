import { Certificate } from "@/entities/Certificate";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const certificatesListAdapter = createEntityAdapter<Certificate>({
    selectId: (certificate) => certificate.id,
});
