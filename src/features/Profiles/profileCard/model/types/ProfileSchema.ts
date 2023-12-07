import { Profile } from "@/entities/Profile/model/types/Profile";

export interface ProfileSchema {
    isDataLoading?: boolean;
    dataError?: string;
    profileData?: Profile;
    profileFormData?: Profile;
    isAvatarLoading?: boolean;
    avatarError?: string;
    profileDataAvatar?: string;
    profileFormDataAvatar?: string;
    _isDataInitialized: boolean;
    _isAvatarInitialized: boolean;
}
