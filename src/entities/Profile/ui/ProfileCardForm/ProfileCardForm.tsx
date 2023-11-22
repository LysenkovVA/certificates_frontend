import { IProfile } from "@/entities/Profile/model/types/IProfile";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
    Avatar,
    DatePicker,
    Form,
    Input,
    Upload,
    UploadFile,
    UploadProps,
} from "antd";
import { RcFile } from "antd/es/upload";
import dayjs from "dayjs";
import { memo, useState } from "react";
import cls from "./ProfileCardForm.module.scss";

interface ProfileCardFormProps {
    className?: string;
    profileData?: IProfile;
    updatedAvatar?: string | ArrayBuffer | null | undefined;
    onChangeSurname?: (value: string) => void;
    onChangeName?: (value: string) => void;
    onChangeBirthDate?: (value: string | undefined) => void;
    onChangeAvatar?: (value: string | ArrayBuffer | null | undefined) => void;
    onChangeAvatar2?: (file: RcFile) => void;
}

export const ProfileCardForm = memo((props: ProfileCardFormProps) => {
    const {
        className,
        profileData,
        updatedAvatar,
        onChangeSurname,
        onChangeName,
        onChangeBirthDate,
        onChangeAvatar,
        onChangeAvatar2,
    } = props;

    const dispatch = useAppDispatch();

    const [file, setFile] = useState<UploadFile>();
    // const [imagePreview, setImagePreview] = useState<
    //     string | ArrayBuffer | null
    // >();

    const uploadProps: UploadProps = {
        showUploadList: false,
        onRemove: (file) => {
            setFile(undefined);
        },
        beforeUpload: (file) => {
            setFile(file);

            onChangeAvatar2?.(file);

            const reader = new FileReader();

            // Gettting Selected File (user can select multiple but we are choosing only one)
            const selectedFile = file;
            if (selectedFile) {
                reader.readAsDataURL(selectedFile);
            }

            // As the File loaded then set the stage as per the file type
            reader.onload = (readerEvent) => {
                if (selectedFile.type.includes("image")) {
                    onChangeAvatar?.(readerEvent?.target?.result);

                    // setImagePreview(readerEvent?.target?.result);
                    // console.log(
                    //     "Image preview: " + String(readerEvent?.target?.result),
                    // );
                }
            };

            return false;
        },
        // customRequest: (options) => {
        //     console.log("CUSTOM REQ: " + options.filename);
        // },
        // file,
    };

    return (
        <Form
            id={"profileCardForm"}
            layout={"horizontal"}
            style={{ width: "100%" }}
            labelWrap
        >
            <Form.Item className={cls.avatar}>
                <Upload {...uploadProps}>
                    <Avatar
                        size={150}
                        src={
                            updatedAvatar
                                ? String(updatedAvatar)
                                : `${__API__}${profileData?.avatar}`
                        }
                        className={classNames(cls.avatar, {}, [className])}
                    />
                </Upload>
            </Form.Item>
            <Form.Item label={"Фамилия:"} labelCol={{ span: 4 }}>
                <Input
                    placeholder={"Укажите фамилию"}
                    value={profileData?.surname}
                    onChange={(e) => onChangeSurname?.(e.target.value)}
                />
            </Form.Item>
            <Form.Item label={"Имя и отчество:"} labelCol={{ span: 4 }}>
                <Input
                    placeholder={"Укажите имя и отчество"}
                    value={profileData?.name}
                    onChange={(e) => onChangeName?.(e.target.value)}
                />
            </Form.Item>
            <Form.Item label={"Дата рождения:"} labelCol={{ span: 4 }}>
                <DatePicker
                    placeholder={"Укажите ДР"}
                    style={{ width: "100%" }}
                    format={"DD.MM.YYYY"}
                    value={dayjs(profileData?.birthDate)}
                    onChange={(e) =>
                        onChangeBirthDate?.(e?.toDate().toDateString())
                    }
                />
            </Form.Item>
        </Form>
    );
});
