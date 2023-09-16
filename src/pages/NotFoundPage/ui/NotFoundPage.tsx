import { classNames } from "@/shared/helpers/classNames/classNames";
import { memo } from "react";
import cls from "./NotFoundPage.module.scss";

interface NotFoundPageProps {
    className?: string;
}

const NotFoundPage = (props: NotFoundPageProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.NotFoundPage, {}, [className])}>
            {"Страница не найдена"}
        </div>
    );
};

export default memo(NotFoundPage);
