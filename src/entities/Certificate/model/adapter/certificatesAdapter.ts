import { ICertificate } from "@/entities/Certificate";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const certificatesAdapter = createEntityAdapter<ICertificate>({
    selectId: (certificate) => certificate.id,
});
