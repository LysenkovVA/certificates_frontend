import { Profile } from "@/entities/Profile/model/types/Profile";

export interface ProfileSchema {
    profileData?: Profile;
    profileFormData?: Profile;
    newAvatar?: string;
    isLoading?: boolean;
    error?: string;
    _isInitialized?: boolean;
}
