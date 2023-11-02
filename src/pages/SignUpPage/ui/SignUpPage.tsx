import { SignUp } from "@/features/signUp";
import { memo } from "react";

export interface SignUpPageProps {
    className?: string;
}

const SignUpPage = (props: SignUpPageProps) => {
    return <SignUp />;
};

export default memo(SignUpPage);
