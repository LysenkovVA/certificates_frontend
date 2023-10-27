import { Authorization } from "@/features/auth/ui/Authorization";
import { memo } from "react";

interface LoginPageProps {
    className?: string;
}

const LoginPage = (props: LoginPageProps) => {
    return <Authorization />;
};

export default memo(LoginPage);
