import { ColorStyle } from "@/shared/types/ColorStyle";
import { TextAlign } from "@/shared/types/TextAlign";
import { TextSize } from "@/shared/types/TextSize";

interface TextBoxProps {
    className?: string;
    label?: string;
    text?: string;
    colorStyle?: ColorStyle;
    align?: TextAlign;
    size?: TextSize;
    bold?: boolean;
}

const TextBox = () => {
    return <div></div>;
};

export default TextBox;
