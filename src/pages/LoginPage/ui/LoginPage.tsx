import { memo } from "react";

interface LoginPageProps {
    className?: string;
}

const LoginPage = (props: LoginPageProps) => {
    const { className } = props;
    return <div>Login page</div>;
    //return <div className={classNames(cls.LoginPage, {})}>LOGIN PAGE</div>;
};

export default memo(LoginPage);
