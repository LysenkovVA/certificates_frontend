import { Authorization } from "@/features/auth";
import { memo } from "react";

interface LoginPageProps {
    className?: string;
}

const LoginPage = (props: LoginPageProps) => {
    return <Authorization />;
};

export default memo(LoginPage);
