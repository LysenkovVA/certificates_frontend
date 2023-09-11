import { Button } from "devextreme-react";
import { memo } from "react";

interface LoginPageProps {
    className?: string;
}

const LoginPage = (props: LoginPageProps) => {
    const { className } = props;

    const sayHelloWorld = () => {
        alert("Hello world!");
    };

    return <Button text="Click me" onClick={sayHelloWorld} />;
    //return <div className={classNames(cls.LoginPage, {})}>LOGIN PAGE</div>;
};

export default memo(LoginPage);
