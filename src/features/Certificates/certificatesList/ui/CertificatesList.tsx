import { CertificateItem } from "@/entities/Certificate";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { InfiniteScrollPage } from "@/widgets/InfiniteScrollPage";
import { Flex, Typography } from "antd";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import {
    getCertificatesList,
    getCertificatesListError,
    getCertificatesListHasMore,
    getCertificatesListIsInitialized,
    getCertificatesListIsLoading,
    getCertificatesListLimit,
    getCertificatesListOffset,
} from "../model/selectors/certificatesListSelectors";
import { fetchCertificates } from "../model/services/fetchCertificates/fetchCertificates";
import {
    certificatesActions,
    certificatesReducer,
} from "../model/slice/certificatesListSlice";

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
    const limit = useSelector(getCertificatesListLimit);
    const offset = useSelector(getCertificatesListOffset);
    const hasMore = useSelector(getCertificatesListHasMore);
    const isInitialized = useSelector(getCertificatesListIsInitialized);

    useInitialEffect(() => {
        if (!isInitialized) {
            dispatch(fetchCertificates({ replaceData: true }));
        }
    });

    const onLoadNextPart = useCallback(() => {
        if (isInitialized && hasMore && !isLoading) {
            dispatch(certificatesActions.setOffset(limit + offset));
            dispatch(fetchCertificates({ replaceData: false }));
        }
    }, [dispatch, hasMore, isInitialized, isLoading, limit, offset]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <InfiniteScrollPage onScrollEnd={onLoadNextPart}>
                <Flex vertical gap={8}>
                    {certificates?.map((certificate) => (
                        <CertificateItem
                            key={certificate.id}
                            certificate={certificate}
                        />
                    ))}
                    {isLoading && <div>{"Загрузка..."}</div>}
                    {error && (
                        <Typography.Text type={"danger"}>
                            {error}
                        </Typography.Text>
                    )}
                </Flex>
            </InfiniteScrollPage>
        </DynamicModuleLoader>
    );
});
