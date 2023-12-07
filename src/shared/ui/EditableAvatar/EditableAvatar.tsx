import { UserOutlined } from "@ant-design/icons";
import { Avatar, AvatarProps, Button, Flex, Upload } from "antd";
import { memo } from "react";

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
                //className={classNames(cls.EditableAvatar, {}, [className])}
                icon={!avatar && <UserOutlined />}
                src={avatar}
                {...otherProps}
            ></Avatar>
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
                        onChangeAvatar?.(imageUrl);
                        return false;
                    }}
                >
                    <Button type={"link"}>{"Загрузить"}</Button>
                </Upload>
            </Flex>
        </Flex>
    );
});
