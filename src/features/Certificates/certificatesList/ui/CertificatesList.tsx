import { CertificateItem } from "@/entities/Certificate";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Flex, Typography } from "antd";
import { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    getCertificatesList,
    getCertificatesListError,
    getCertificatesListIsInitialized,
    getCertificatesListIsLoading,
} from "../model/selectors/certificatesListSelectors";
import { fetchCertificates } from "../model/services/fetchCertificates/fetchCertificates";
import { certificatesReducer } from "../model/slice/certificatesListSlice";

interface CertificatesListProps {
    className?: string;
}

const reducers: ReducersList = {
    certificatesSchema: certificatesReducer,
};

export const CertificatesList = memo((props: CertificatesListProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const certificates = useSelector(getCertificatesList.selectAll);
    const isLoading = useSelector(getCertificatesListIsLoading);
    const error = useSelector(getCertificatesListError);
    const isInited = useSelector(getCertificatesListIsInitialized);

    useEffect(() => {
        if (__PROJECT_ENV__ !== "storybook" && !isInited) {
            dispatch(fetchCertificates({ replaceData: true }));
        }
    }, [dispatch, isInited]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Flex vertical gap={8}>
                {certificates?.map((certificate) => (
                    <CertificateItem
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
});
