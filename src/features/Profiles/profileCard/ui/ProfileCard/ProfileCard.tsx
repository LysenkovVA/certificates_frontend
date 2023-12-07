import { userActions } from "@/entities/User/model/slice/userSlice";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { SaveCancelButtons } from "@/shared/ui/SaveCancelButtons/SaveCancelButtons";
import { Card } from "antd";
import { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    getProfileData,
    getProfileDataAvatar,
    getProfileDataAvatarInitialized,
    getProfileDataInitialized,
    getProfileFormData,
} from "../../model/selectors/profileSelectors";
import { fetchProfileAvatar } from "../../model/services/fetchProfileAvatar/fetchProfileAvatar";
import { fetchProfileData } from "../../model/services/fetchProfileData/fetchProfileData";
import { updateProfileAvatar } from "../../model/services/updateProfileAvatar/updateProfileAvatar";
import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData";
import { profileActions, profileReducer } from "../../model/slice/profileSlice";
import { ProfileCardForm } from "../ProfileCardForm/ProfileCardForm";
import { ProfileCardView } from "../ProfileCardView/ProfileCardView";

interface ProfileCardProps {
    className?: string;
}

const reducers: ReducersList = {
    profileSchema: profileReducer,
};

export const ProfileCard = memo((props: ProfileCardProps) => {
    const { className } = props;

    const { id: profileId } = useParams<{ id: string }>();

    const [newAvatar, setNewAvatar] = useState<string>();
    const [readOnly, setReadOnly] = useState(true);

    const dispatch = useAppDispatch();
    // const user = useSelector(getAuthenticatedUser);

    const isInitialized = useSelector(getProfileDataInitialized);
    const isAvatarInitialized = useSelector(getProfileDataAvatarInitialized);
    const profileData = useSelector(getProfileData);
    const profileFormData = useSelector(getProfileFormData);
    const avatar = useSelector(getProfileDataAvatar);

    useEffect(() => {
        if (!isInitialized) {
            dispatch(fetchProfileData({ profileId }));
        }

        if (isInitialized && !isAvatarInitialized) {
            dispatch(fetchProfileAvatar({ fileId: profileData.avatar?.id }));
        }
    }, [dispatch, isAvatarInitialized, isInitialized, profileData, profileId]);

    const onEditClick = useCallback(() => {
        setReadOnly(false);
    }, [setReadOnly]);

    const onSaveClick = useCallback(async () => {
        // Обновляем данные
        await dispatch(
            updateProfileData({
                profileData: profileFormData,
            }),
        );

        // Получаем новые данные
        await dispatch(fetchProfileData({ profileId }));

        // Обновляем аватар
        if (newAvatar && profileFormData.id) {
            const blob = await fetch(newAvatar).then((r) => r.blob());
            await dispatch(
                updateProfileAvatar({ profileId: profileData.id!, file: blob }),
            );
        }

        // Получаем новый аватар
        await dispatch(fetchProfileAvatar({ fileId: profileData.avatar?.id }));

        // Обновляем пользовательскую схему
        dispatch(userActions.setAvatarIsInitialized(false));

        setReadOnly(true);
    }, [
        dispatch,
        profileFormData,
        profileId,
        newAvatar,
        profileData.avatar?.id,
        profileData.id,
    ]);

    const onCancelClick = useCallback(() => {
        // Возвращаем обратно значения профиля
        dispatch(profileActions.setProfileFormData({ ...profileData }));

        setNewAvatar(undefined);
        setReadOnly(true);
    }, [dispatch, profileData]);

    const onChangeSurname = useCallback(
        (value: string) => {
            dispatch(
                profileActions.setProfileFormData({
                    ...profileFormData,
                    surname: value,
                }),
            );
        },
        [dispatch, profileFormData],
    );

    const onChangeName = useCallback(
        (value: string) => {
            dispatch(
                profileActions.setProfileFormData({
                    ...profileFormData,
                    name: value,
                }),
            );
        },
        [dispatch, profileFormData],
    );

    const onChangeBirthDate = useCallback(
        (value: string | undefined) => {
            dispatch(
                profileActions.setProfileFormData({
                    ...profileFormData,
                    birthDate: value,
                }),
            );
        },
        [dispatch, profileFormData],
    );

    const onChangeAvatar = useCallback((value: string) => {
        setNewAvatar(value);
    }, []);

    const extraContent = (
        <>
            {readOnly ? (
                <a onClick={onEditClick}>Изменить</a>
            ) : (
                <SaveCancelButtons
                    onSaveClick={onSaveClick}
                    onCancelClick={onCancelClick}
                />
            )}
        </>
    );

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Card title={"Профиль пользователя"} extra={extraContent}>
                {readOnly ? (
                    <ProfileCardView
                        profileData={profileData}
                        avatar={avatar}
                    />
                ) : (
                    <ProfileCardForm
                        profileData={profileFormData}
                        avatar={newAvatar ?? avatar}
                        onChangeSurname={onChangeSurname}
                        onChangeName={onChangeName}
                        onChangeBirthDate={onChangeBirthDate}
                        onChangeAvatar={onChangeAvatar}
                    />
                )}
            </Card>
        </DynamicModuleLoader>
    );
});
