import { classNames } from "@/shared/lib/classNames/classNames";
import { Select } from "antd";
import { memo } from "react";
import cls from "./SelectField.module.scss";

interface SelectFieldProps {
    className?: string;
    options: any[];
    value: string;
    onChange: (value: string) => void;
}

export const SelectField = memo((props: SelectFieldProps) => {
    const { className, options, value, onChange } = props;
    return (
        <Select
            style={{ width: 300 }}
            className={classNames(cls.SelectField, {}, [className])}
            options={options}
            value={value}
            onChange={onChange}
        />
    );
});
