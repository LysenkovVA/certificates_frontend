import { SignUp } from "@/features/signUp";
import { memo } from "react";

interface SignUpPageProps {
    className?: string;
}

const SignUpPage = (props: SignUpPageProps) => {
    return <SignUp />;
};

export default memo(SignUpPage);
