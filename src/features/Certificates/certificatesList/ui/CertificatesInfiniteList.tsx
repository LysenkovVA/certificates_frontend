import { CertificateItem } from "@/entities/Certificate";
import { fetchInfiniteListCertificates } from "@/features/Certificates/certificatesList/model/services/fetchInfiniteListCertificates/fetchInfiniteListCertificates";
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
    getCertificatesInfiniteList,
    getCertificatesInfiniteListError,
    getCertificatesInfiniteListHasMore,
    getCertificatesInfiniteListIsInitialized,
    getCertificatesInfiniteListIsLoading,
    getCertificatesInfiniteListLimit,
    getCertificatesInfiniteListOffset,
} from "../model/selectors/certificatesInfiniteListSelectors";
import {
    certificatesInfiniteListActions,
    certificatesInfiniteListReducer,
} from "../model/slice/certificatesInfiniteListSlice";

interface CertificatesInfiniteListProps {
    className?: string;
}

const reducers: ReducersList = {
    certificatesInfiniteListSchema: certificatesInfiniteListReducer,
};

export const CertificatesInfiniteList = memo(
    (props: CertificatesInfiniteListProps) => {
        const { className } = props;
        const dispatch = useAppDispatch();
        const certificates = useSelector(getCertificatesInfiniteList.selectAll);
        const isLoading = useSelector(getCertificatesInfiniteListIsLoading);
        const error = useSelector(getCertificatesInfiniteListError);
        const limit = useSelector(getCertificatesInfiniteListLimit);
        const offset = useSelector(getCertificatesInfiniteListOffset);
        const hasMore = useSelector(getCertificatesInfiniteListHasMore);
        const isInitialized = useSelector(
            getCertificatesInfiniteListIsInitialized,
        );

        useInitialEffect(() => {
            if (!isInitialized) {
                dispatch(fetchInfiniteListCertificates({ replaceData: true }));
            }
        });

        const onLoadNextPart = useCallback(() => {
            if (isInitialized && hasMore && !isLoading) {
                dispatch(
                    certificatesInfiniteListActions.setOffset(limit + offset),
                );
                dispatch(fetchInfiniteListCertificates({ replaceData: false }));
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
    },
);
