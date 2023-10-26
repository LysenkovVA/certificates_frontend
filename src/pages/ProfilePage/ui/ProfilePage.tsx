import { getAuthenticatedUser } from "@/entities/User/model/selectors/getAuthenticatedUser/getAuthenticatedUser";
import { userActions } from "@/entities/User/model/slice/userSlice";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button } from "@/shared/ui/Button";
import { VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cls from "./ProfilePage.module.scss";

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = (props: ProfilePageProps) => {
    const { className } = props;

    const dispatch = useDispatch();
    const authData = useSelector(getAuthenticatedUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authData?.token) {
            navigate("/");
        }
    }, [authData, navigate]);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    return (
        <div className={classNames(cls.ProfilePage, {}, [className])}>
            <VStack gap={"8"} align={"center"}>
                <Text title={"This is profile page"} size={"l"} />
                <Button colorStyle={"base"} onClick={onLogout}>
                    {"Logout"}
                </Button>
            </VStack>
        </div>
    );
};

export default memo(ProfilePage);
