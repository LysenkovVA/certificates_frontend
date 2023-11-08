import { Button, Result } from "antd";
import { memo } from "react";

export interface NotFoundPageProps {
    className?: string;
}

const NotFoundPage = (props: NotFoundPageProps) => {
    const { className } = props;

    return (
        <Result
            status="404"
            title="404"
            subTitle="Страница не найдена!"
            extra={<Button type="primary">На главную</Button>}
        />
    );
};

export default memo(NotFoundPage);
