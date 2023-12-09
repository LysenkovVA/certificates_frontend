import { downloadFile, File } from "@/entities/File";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { CloseCircleFilled, UserOutlined } from "@ant-design/icons";
import { Avatar, AvatarProps, Button, Flex, Skeleton, Upload } from "antd";
import { memo, useEffect, useState } from "react";
import cls from "./EditableAvatar.module.scss";

type AvProps = Omit<AvatarProps, "className">;

interface EditableAvatarProps extends AvProps {
    className?: string;
    file: File | undefined;
    onChangeAvatar?: (value: string) => void;
    canEdit?: boolean;
}

export const EditableAvatar = memo((props: EditableAvatarProps) => {
    const {
        className,
        file,
        onChangeAvatar,
        canEdit = true,
        ...otherProps
    } = props;

    const [avatar, setAvatar] = useState<string | undefined>("");
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (__PROJECT_ENV__ !== "storybook") {
            setIsLoading(true);

            if (file?.id) {
                dispatch(downloadFile({ fileId: file.id }))
                    .then((data) => {
                        setAvatar(data.payload);
                    })
                    .catch(() => {
                        setAvatar(undefined);
                        setHasError(true);
                    })
                    .finally(() => {});
            }

            setIsLoading(false);
        }
    }, [dispatch, file, file?.id]);

    return (
        <Flex vertical align={"center"} justify={"center"}>
            {isLoading ? (
                <Skeleton.Avatar
                    rootClassName={classNames(cls.EditableAvatar, {}, [
                        className,
                    ])}
                    shape={"square"}
                    size={80}
                    active
                />
            ) : hasError ? (
                <Avatar
                    className={classNames(cls.EditableAvatar, {}, [className])}
                    icon={<CloseCircleFilled />}
                    {...otherProps}
                />
            ) : (
                <Avatar
                    className={classNames(cls.EditableAvatar, {}, [className])}
                    icon={!avatar && <UserOutlined />}
                    src={avatar}
                    {...otherProps}
                />
            )}
            {canEdit && (
                <Flex vertical gap={0}>
                    <Upload
                        showUploadList={false}
                        beforeUpload={async (file) => {
                            const arrayBufferView = new Uint8Array(
                                await file.arrayBuffer(),
                            );
                            const blob = new Blob([arrayBufferView], {
                                type: "image/jpeg",
                            });
                            const urlCreator = window.URL || window.webkitURL;
                            const imageUrl = urlCreator.createObjectURL(blob);
                            setAvatar(imageUrl);
                            onChangeAvatar?.(imageUrl);
                            return false;
                        }}
                    >
                        <Button type={"link"}>
                            {!avatar ? "Загрузить" : "Обновить"}
                        </Button>
                    </Upload>
                </Flex>
            )}
        </Flex>
    );
});
