import { classNames } from "@/shared/lib/classNames/classNames";
import { Avatar, AvatarProps, Button, Flex, Upload } from "antd";
import { memo } from "react";
import cls from "./EditableAvatar.module.scss";

interface EditableAvatarProps extends AvatarProps {
    className?: string;
    avatar?: string;
    onChangeAvatar?: (value: string) => void;
}

export const EditableAvatar = memo((props: EditableAvatarProps) => {
    const { className, avatar, onChangeAvatar, ...otherProps } = props;

    return (
        <Flex vertical align={"center"} justify={"center"}>
            <Avatar
                className={classNames(cls.EditableAvatar, {}, [className])}
                src={avatar}
                {...otherProps}
            ></Avatar>
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
                    // const img = new Image();
                    // img.src = imageUrl;

                    onChangeAvatar?.(imageUrl);
                    // setAvatar(imageUrl);
                    return false;
                }}
            >
                <Button type={"link"}>Обновить</Button>
            </Upload>
        </Flex>
    );
});
