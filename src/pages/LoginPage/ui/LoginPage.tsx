import { Authorization } from "@/features/auth";
import { memo } from "react";

export interface LoginPageProps {
    className?: string;
}

const LoginPage = (props: LoginPageProps) => {
    return <Authorization />;
};

export default memo(LoginPage);
