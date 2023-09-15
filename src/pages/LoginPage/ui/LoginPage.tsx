import { classNames } from "@/shared/helpers/classNames/classNames";
import { Form } from "devextreme-react";
import {
    ButtonItem,
    ButtonOptions,
    EmptyItem,
    SimpleItem,
} from "devextreme-react/form";
import { memo } from "react";
import cls from "./LoginPage.module.scss";

interface LoginPageProps {
    className?: string;
}

const LoginPage = (props: LoginPageProps) => {
    const { className } = props;

    return (
        // <div className="dx-card">
        //     <div className="dx-field-label">Full Name</div>
        //     <div className="dx-field-value-static">John Smith</div>
        // </div>
        <div className={classNames(cls.LoginPage, {}, [className])}>
            <Form id={"loginForm"}>
                <SimpleItem
                    editorType={"dxTextBox"}
                    editorOptions={{ placeholder: "Email" }}
                />
                <SimpleItem
                    editorType={"dxTextBox"}
                    editorOptions={{ placeholder: "Пароль" }}
                />
                <EmptyItem />
                <ButtonItem horizontalAlignment={"center"}>
                    <ButtonOptions
                        text={"Войти"}
                        icon={"unlock"}
                        type={"success"}
                        stylingMode={"outlined"}
                    />
                </ButtonItem>
                <ButtonItem horizontalAlignment={"center"}>
                    <ButtonOptions
                        text={"Зарегистрироваться"}
                        // icon={"user"}
                        type={"default"}
                        stylingMode={"outlined"}
                    />
                </ButtonItem>
            </Form>
        </div>
    );
};

export default memo(LoginPage);
