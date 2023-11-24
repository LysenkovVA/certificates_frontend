import { fetchProfileData } from "@/entities/Profile/model/services/fetchProfileData/fetchProfileData";
import { updateProfileAvatar } from "@/entities/Profile/model/services/updateProfileAvatar/updateProfileAvatar";
import { updateProfileData } from "@/entities/Profile/model/services/updateProfileData/updateProfileData";
import {
    profileActions,
    profileReducer,
} from "@/entities/Profile/model/slice/profileSlice";
import { getAuthenticatedUser } from "@/entities/User";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { SaveCancelButtons } from "@/shared/ui/SaveCancelButtons/SaveCancelButtons";
import { Card } from "antd";
import { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    getProfileData,
    getProfileDataInitialized,
} from "../../model/selectors/getProfileData/getProfileData";
import { getProfileFormData } from "../../model/selectors/getProfileFormData/getProfileFormData";
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

    const dispatch = useAppDispatch();
    const user = useSelector(getAuthenticatedUser);

    const profileData = useSelector(getProfileData);
    const profileFormData = useSelector(getProfileFormData);
    const isInitialized = useSelector(getProfileDataInitialized);

    useEffect(() => {
        if (!isInitialized) {
            dispatch(fetchProfileData({ userId: user.id }));
            setAvatar(`${__API__}files/download/${profileData?.id}/avatar`);
        }
    }, [dispatch, isInitialized, profileData?.id, user.id]);

    const [avatar, setAvatar] = useState<string>();

    console.log(
        "RENDER PROFILE CARD: " +
            `${__API__}files/download/${profileData?.id}/avatar`,
    );

    const [readOnly, setReadOnly] = useState(true);

    const onEditClick = useCallback(() => {
        setReadOnly(false);
    }, [setReadOnly]);

    const onSaveClick = useCallback(async () => {
        // Отправляем запрос на сервер
        dispatch(
            updateProfileData({
                profileData: profileFormData,
            }),
        );
        if (avatar) {
            // Конвертируем в картинку
            const image = new Image();
            image.src = avatar;

            // Грузим картинку
            const blob = await fetch(avatar).then((r) => r.blob());
            const result = await dispatch(
                updateProfileAvatar({ profileId: "1", image: blob }),
            ).then((data) => data.payload);

            console.log("PAYLOAD LOADING: " + JSON.stringify(result));
        }

        setReadOnly(true);
    }, [avatar, dispatch, profileFormData]);

    const onCancelClick = useCallback(() => {
        // Возвращаем обратно значения профиля
        dispatch(profileActions.setProfileFormData({ ...profileData }));
        setAvatar(`${__API__}files/download/${profileData?.id}/avatar`);
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
        setAvatar(value);
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
        <DynamicModuleLoader reducers={reducers}>
            <Card title={"Профиль пользователя"} extra={extraContent}>
                {readOnly ? (
                    <ProfileCardView profileData={profileData} />
                ) : (
                    <ProfileCardForm
                        profileData={profileFormData}
                        avatar={avatar}
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
