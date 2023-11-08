import { getProfileData } from "@/entities/User/model/selectors/getProfileData/getProfileData";
import { ProfileCard } from "@/entities/User/ui/ProfileCard/ProfileCard";
import { memo } from "react";
import { useSelector } from "react-redux";

export interface ProfilePageProps {
    className?: string;
}

const ProfilePage = (props: ProfilePageProps) => {
    const { className } = props;

    const profileData = useSelector(getProfileData);

    return <ProfileCard profileData={profileData} />;
};

export default memo(ProfilePage);
