export const getFileDownloadRoute = (fileId: string) => {
    return `/files/download/${fileId}`;
};

export const getProfileAvatarUploadRoute = (profileId: string) => {
    return `/files/upload/avatar/${profileId}`;
};
