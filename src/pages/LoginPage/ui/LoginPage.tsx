import { classNames } from "@/shared/helpers/classNames/classNames";
import { Text } from "@/shared/ui/Text/ui/Text";
import { memo } from "react";
import cls from "./LoginPage.module.scss";

interface LoginPageProps {
    className?: string;
}

const LoginPage = (props: LoginPageProps) => {
    const { className } = props;

    // useEffect(() => {
    //     throw new Error("Use effect error");
    // }, []);

    return (
        <div className={classNames(cls.LoginPage, {}, [className])}>
            <Text title={"Title"} text={"text"} bold variant={"primary"} />
        </div>
    );
};

export default memo(LoginPage);
