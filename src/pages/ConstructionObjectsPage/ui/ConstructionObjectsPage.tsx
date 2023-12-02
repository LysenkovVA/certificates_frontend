import { ConstructionObjectsInfiniteList } from "@/features/ConstructionObjects/constructionObjectsList";
import { memo } from "react";

export interface ConstructionObjectsPageProps {
    className?: string;
}

const ConstructionObjectsPage = (props: ConstructionObjectsPageProps) => {
    const { className } = props;

    return <ConstructionObjectsInfiniteList />;
};

export default memo(ConstructionObjectsPage);
