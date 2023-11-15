import { ThunkConfig } from "@/app/providers/StoreProvider";
import { ICertificate } from "@/entities/Certificate/model/types/ICertificate";
import { FetchRowsResult } from "@/shared/types/FetchRowsResult";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface FetchCertificatesByEmployeeIdProps {
    employeeId: string;
}

export const fetchCertificatesByEmployeeId = createAsyncThunk<
    FetchRowsResult<ICertificate> | undefined,
    FetchCertificatesByEmployeeIdProps,
    ThunkConfig<string>
>("certificate/fetchCertificatesByEmployeeId", async (props, thunkApi) => {
    const { employeeId } = props;
    const { extra, rejectWithValue } = thunkApi;

    try {
        // Отправляем запрос
        const response = await extra.api.get<FetchRowsResult<ICertificate>>(
            `/certificates/employee/${employeeId}`,
        );

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        return response.data;
    } catch (e) {
        rejectWithValue("Произошла ошибка при загрузке удостоверений");
    }
});
