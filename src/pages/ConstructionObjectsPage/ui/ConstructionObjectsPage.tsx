import { ConstructionObjectCard } from "@/entities/ConstructionObject";
import {
    getConstructionObjects,
    getConstructionObjectsError,
    getConstructionObjectsIsInited,
    getConstructionObjectsIsLoading,
} from "@/entities/ConstructionObject/model/selectors/constructionObjectsSelectors";
import { fetchConstructionObjects } from "@/entities/ConstructionObject/model/services/fetchConstructionObjects/fetchConstructionObjects";
import { constructionObjectsReducer } from "@/entities/ConstructionObject/model/slice/constructionObjectsSlice";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Flex, Typography } from "antd";
import { memo, useEffect } from "react";
import { useSelector } from "react-redux";

export interface ConstructionObjectsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    constructionObjectsSchema: constructionObjectsReducer,
};

const ConstructionObjectsPage = (props: ConstructionObjectsPageProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();
    const constructionObjects = useSelector(getConstructionObjects.selectAll);
    const isLoading = useSelector(getConstructionObjectsIsLoading);
    const error = useSelector(getConstructionObjectsError);
    const isInited = useSelector(getConstructionObjectsIsInited);

    useEffect(() => {
        if (!isInited) {
            dispatch(fetchConstructionObjects({ replaceData: true }));
        }
    }, [dispatch, isInited]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Flex vertical gap={8}>
                {constructionObjects?.map((constructionObject) => (
                    <ConstructionObjectCard
                        key={constructionObject.id}
                        constructionObject={constructionObject}
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

export default memo(ConstructionObjectsPage);
