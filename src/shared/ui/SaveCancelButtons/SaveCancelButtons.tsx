import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";

interface SaveCancelButtonsProps {
    className?: string;
    isVisible?: boolean;
    onSaveClick?: () => void;
    onCancelClick?: () => void;
}

export const SaveCancelButtons = (props: SaveCancelButtonsProps) => {
    const { isVisible = true, onSaveClick, onCancelClick } = props;

    if (!isVisible) {
        return null;
    }

    return (
        <Flex align={"center"} justify={"center"} gap={"small"}>
            <Button
                type={"default"}
                icon={<SaveOutlined />}
                onClick={onSaveClick}
            >
                {"Сохранить"}
            </Button>
            <Button
                type={"default"}
                icon={<CloseOutlined />}
                onClick={onCancelClick}
                danger
            >
                {"Отмена"}
            </Button>
        </Flex>
    );
};
