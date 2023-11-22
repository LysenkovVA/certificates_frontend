import { IProfile } from "@/entities/Profile/model/types/IProfile";

export interface ProfileSchema {
    profileData?: IProfile;
    profileFormData?: IProfile;
    newAvatar?: string;
    isLoading?: boolean;
    error?: string;
}
