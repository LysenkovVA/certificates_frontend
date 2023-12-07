import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getUserIsInited = (state: StateSchema) =>
    state?.userSchema?._isInitialized ?? "false";

export const getUserAvatar = (state: StateSchema) =>
    state?.userSchema?.avatar ?? "";

export const getUserAvatarIsInited = (state: StateSchema) =>
    state?.userSchema?._isAvatarInitialized ?? "false";
