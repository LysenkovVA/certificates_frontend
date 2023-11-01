import { classNames } from "@/shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./ConstructionObjectsPage.module.scss";

interface ConstructionObjectsPageProps {
    className?: string;
}

const ConstructionObjectsPage = (props: ConstructionObjectsPageProps) => {
    const { className } = props;

    return (
        <div
            className={classNames(cls.ConstructionObjectsPage, {}, [className])}
        >
            {"Construction objects page"}
        </div>
    );
};

export default memo(ConstructionObjectsPage);
