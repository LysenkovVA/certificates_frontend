import { classNames } from "@/shared/lib/classNames/classNames";
import { ColorStyle } from "@/shared/types/ColorStyle";
import { TextAlign } from "@/shared/types/TextAlign";
import { TextSize } from "@/shared/types/TextSize";
import { memo } from "react";
import cls from "./Text.module.scss";

type HeaderTagType = "h1" | "h2" | "h3" | "h4";

const mapSizeToClass: Record<TextSize, string> = {
    xs: cls.size_xs,
    s: cls.size_s,
    m: cls.size_m,
    l: cls.size_l,
};

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    xs: "h4",
    s: "h3",
    m: "h2",
    l: "h1",
};

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    colorStyle?: ColorStyle;
    align?: TextAlign;
    size?: TextSize;
    bold?: boolean;
    "data-testid"?: string; // на будущее для тестов
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        text,
        title,
        colorStyle = "base",
        align = "left",
        size = "m",
        bold,
        "data-testid": dataTestId = "Text",
    } = props;

    const HeaderTag = mapSizeToHeaderTag[size];
    const sizeClass = mapSizeToClass[size];

    const additionalClasses = [
        className,
        cls[colorStyle],
        cls[align],
        sizeClass,
    ];

    return (
        <div
            className={classNames(
                cls.Text,
                { [cls.bold]: bold },
                additionalClasses,
            )}
        >
            {title && (
                <HeaderTag
                    className={cls.title}
                    data-testid={`${dataTestId}.Header`}
                >
                    {title}
                </HeaderTag>
            )}
            {text && (
                <p className={cls.text} data-testid={`${dataTestId}.Paragraph`}>
                    {text}
                </p>
            )}
        </div>
    );
});
