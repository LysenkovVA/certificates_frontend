import { ConstructionObjectItem } from "@/entities/ConstructionObject";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Flex, Typography } from "antd";
import { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    getConstructionObjectsList,
    getConstructionObjectsListError,
    getConstructionObjectsListIsInitialized,
    getConstructionObjectsListIsLoading,
} from "../model/selectors/constructionObjectsListSelectors";
import { fetchConstructionObjects } from "../model/services/fetchConstructionObjects/fetchConstructionObjects";
import { constructionObjectsReducer } from "../model/slice/constructionObjectsSlice";

interface ConstructionObjectsListProps {
    className?: string;
}

const reducers: ReducersList = {
    constructionObjectsSchema: constructionObjectsReducer,
};

export const ConstructionObjectsList = memo(
    (props: ConstructionObjectsListProps) => {
        const { className } = props;
        const dispatch = useAppDispatch();
        const constructionObjects = useSelector(
            getConstructionObjectsList.selectAll,
        );
        const isLoading = useSelector(getConstructionObjectsListIsLoading);
        const error = useSelector(getConstructionObjectsListError);
        const isInited = useSelector(getConstructionObjectsListIsInitialized);

        useEffect(() => {
            if (__PROJECT_ENV__ !== "storybook" && !isInited) {
                dispatch(fetchConstructionObjects({ replaceData: true }));
            }
        }, [dispatch, isInited]);

        return (
            <DynamicModuleLoader reducers={reducers}>
                <Flex vertical gap={8}>
                    {constructionObjects?.map((constructionObject) => (
                        <ConstructionObjectItem
                            key={constructionObject.id}
                            constructionObject={constructionObject}
                        />
                    ))}
                    {isLoading && <div>{"Загрузка..."}</div>}
                    {error && (
                        <Typography.Text type={"danger"}>
                            {error}
                        </Typography.Text>
                    )}
                </Flex>
            </DynamicModuleLoader>
        );
    },
);
