import { ProfileCard } from "@/entities/Profile/ui/ProfileCard/ProfileCard";
import { memo } from "react";

export interface ProfilePageProps {
    className?: string;
}

const ProfilePage = (props: ProfilePageProps) => {
    const { className } = props;
    return <ProfileCard />;
};

export default memo(ProfilePage);
