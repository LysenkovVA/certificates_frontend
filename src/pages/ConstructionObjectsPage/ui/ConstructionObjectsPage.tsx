import { ConstructionObjectsList } from "@/features/ConstructionObjects/constructionObjectsList";
import { memo } from "react";

export interface ConstructionObjectsPageProps {
    className?: string;
}

const ConstructionObjectsPage = (props: ConstructionObjectsPageProps) => {
    const { className } = props;

    return <ConstructionObjectsList />;
};

export default memo(ConstructionObjectsPage);
