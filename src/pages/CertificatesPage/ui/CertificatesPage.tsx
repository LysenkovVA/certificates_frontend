import { CertificateCard } from "@/entities/Certificate";
import {
    getCertificates,
    getCertificatesError,
    getCertificatesIsInited,
    getCertificatesIsLoading,
} from "@/entities/Certificate/model/selectors/certificatesSelectors";
import { fetchCertificates } from "@/entities/Certificate/model/services/fetchCertificates/fetchCertificates";
import { certificatesReducer } from "@/entities/Certificate/model/slice/certificatesSlice";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Flex, Typography } from "antd";
import { memo, useEffect } from "react";
import { useSelector } from "react-redux";

export interface CertificatesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    certificatesSchema: certificatesReducer,
};

const CertificatesPage = (props: CertificatesPageProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();
    const certificates = useSelector(getCertificates.selectAll);
    const isLoading = useSelector(getCertificatesIsLoading);
    const error = useSelector(getCertificatesError);
    const isInited = useSelector(getCertificatesIsInited);

    useEffect(() => {
        if (!isInited) {
            dispatch(fetchCertificates({ replaceData: true }));
        }
    }, [dispatch, isInited]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Flex vertical gap={8}>
                {certificates?.map((certificate) => (
                    <CertificateCard
                        key={certificate.id}
                        certificate={certificate}
                    />
                ))}
                {isLoading && <div>{"Загрузка..."}</div>}
                {error && (
                    <Typography.Text type={"danger"}>{error}</Typography.Text>
                )}
            </Flex>
        </DynamicModuleLoader>
    );
};

export default memo(CertificatesPage);
