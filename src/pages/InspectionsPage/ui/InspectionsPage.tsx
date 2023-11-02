import { classNames } from "@/shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./InspectionsPage.module.scss";

export interface InspectionsPageProps {
    className?: string;
}

const InspectionsPage = (props: InspectionsPageProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.InspectionsPage, {}, [className])}>
            {"Inspections page"}
        </div>
    );
};

export default memo(InspectionsPage);
