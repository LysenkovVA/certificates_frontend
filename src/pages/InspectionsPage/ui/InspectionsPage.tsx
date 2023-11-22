import { updateProfileAvatar } from "@/entities/Profile/model/services/updateProfileAvatar/updateProfileAvatar";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { EditableAvatar } from "@/shared/ui/EditableAvatar/EditableAvatar";
import { Button } from "antd";
import { memo, useCallback, useState } from "react";
import cls from "./InspectionsPage.module.scss";

export interface InspectionsPageProps {
    className?: string;
}

const InspectionsPage = (props: InspectionsPageProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();
    const [avatar, setAvatar] = useState<string>();

    const onChangeAvatar = useCallback((value: string) => {
        setAvatar(value);
    }, []);

    const onUpload = useCallback(async () => {
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
    }, [avatar, dispatch]);

    return (
        <div className={classNames(cls.InspectionsPage, {}, [className])}>
            {"Inspections page"}
            <EditableAvatar
                style={{ width: 150, height: 150 }}
                avatar={avatar}
                onChangeAvatar={onChangeAvatar}
            />

            <Button type={"dashed"} onClick={onUpload}>
                Upload to server
            </Button>
        </div>
    );
};

export default memo(InspectionsPage);
