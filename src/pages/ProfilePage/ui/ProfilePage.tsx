import { UserCard } from "@/entities/User";
import { getAuthenticatedUser } from "@/entities/User/model/selectors/getAuthenticatedUser/getAuthenticatedUser";
import { userActions } from "@/entities/User/model/slice/userSlice";
import { memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export interface ProfilePageProps {
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

    return <UserCard />;
};

export default memo(ProfilePage);
