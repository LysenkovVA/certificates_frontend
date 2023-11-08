import { getAuthenticatedUser } from "@/entities/User";
import { updateProfile } from "@/entities/User/model/services/updateProfileData";
import { userActions } from "@/entities/User/model/slice/userSlice";
import { IUser } from "@/entities/User/model/types/IUser";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { SaveCancelButtons } from "@/shared/ui/SaveCancelButtons/SaveCancelButtons";
import { Card } from "antd";
import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { ProfileCardForm } from "../ProfileCardForm/ProfileCardForm";
import { ProfileCardView } from "../ProfileCardView/ProfileCardView";

interface ProfileCardProps {
    className?: string;
    profileData?: IUser;
}

export const ProfileCard = memo((props: ProfileCardProps) => {
    const { profileData, className } = props;

    const dispatch = useAppDispatch();
    const userData = useSelector(getAuthenticatedUser);

    const [readOnly, setReadOnly] = useState(true);

    const onEditClick = useCallback(() => {
        setReadOnly(false);
    }, [setReadOnly]);

    const onSaveClick = useCallback(() => {
        // Отправляем запрос на сервер
        if (userData?.id && profileData) {
            dispatch(
                updateProfile({ userId: userData.id, userData: profileData }),
            );
        }

        setReadOnly(true);
    }, [dispatch, profileData, userData]);

    const onCancelClick = useCallback(() => {
        // Возвращаем обратно значения профиля
        dispatch(userActions.setProfileData({ ...userData }));

        setReadOnly(true);
    }, [dispatch, userData]);

    const onChangeSurname = useCallback(
        (value: string) => {
            dispatch(
                userActions.setProfileData({
                    ...profileData,
                    surname: value,
                }),
            );
        },
        [dispatch, profileData],
    );

    const onChangeName = useCallback(
        (value: string) => {
            dispatch(
                userActions.setProfileData({
                    ...profileData,
                    name: value,
                }),
            );
        },
        [dispatch, profileData],
    );

    const onChangeBirthDate = useCallback(
        (value: string | undefined) => {
            console.log("onChangeBD " + String(value));

            dispatch(
                userActions.setProfileData({
                    ...profileData,
                    birthDate: value,
                }),
            );
        },
        [dispatch, profileData],
    );

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
        <Card title={"Профиль пользователя"} extra={extraContent}>
            {readOnly ? (
                <ProfileCardView profileData={profileData} />
            ) : (
                <ProfileCardForm
                    profileData={profileData}
                    onChangeSurname={onChangeSurname}
                    onChangeName={onChangeName}
                    onChangeBirthDate={onChangeBirthDate}
                />
            )}
        </Card>
    );
});
