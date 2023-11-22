import { fetchProfileData } from "@/entities/Profile/model/services/fetchProfileData/fetchProfileData";
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
import { Card, UploadFile } from "antd";
import { RcFile } from "antd/es/upload";
import { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProfileData } from "../../model/selectors/getProfileData/getProfileData";
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

    useEffect(() => {
        dispatch(fetchProfileData({ userId: user.id }));
    }, [dispatch, user.id]);

    const profileData = useSelector(getProfileData);
    const profileFormData = useSelector(getProfileFormData);
    const [avatar, setAvatar] = useState<
        string | ArrayBuffer | null | undefined
    >();

    const [file, setFile] = useState<UploadFile>();

    const [readOnly, setReadOnly] = useState(true);

    const onEditClick = useCallback(() => {
        setReadOnly(false);
    }, [setReadOnly]);

    const onSaveClick = useCallback(() => {
        // Отправляем запрос на сервер
        dispatch(
            updateProfileData({
                profileData: profileFormData,
            }),
        );
        // dispatch(
        //     updateProfileAvatar({
        //         profileId: profileFormData.id,
        //         file,
        //     }),
        // );

        setReadOnly(true);
    }, [dispatch, file, profileFormData]);

    const onCancelClick = useCallback(() => {
        // Возвращаем обратно значения профиля
        dispatch(profileActions.setProfileFormData({ ...profileData }));
        setAvatar(null);
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

    const onChangeAvatar = useCallback(
        (value: string | ArrayBuffer | null | undefined) => {
            setAvatar(value);
        },
        [],
    );
    const onChangeAvatar2 = useCallback((file: RcFile) => {
        setFile(file);
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
                        updatedAvatar={avatar}
                        onChangeSurname={onChangeSurname}
                        onChangeName={onChangeName}
                        onChangeBirthDate={onChangeBirthDate}
                        onChangeAvatar={onChangeAvatar}
                        onChangeAvatar2={onChangeAvatar2}
                    />
                )}
            </Card>
        </DynamicModuleLoader>
    );
});
