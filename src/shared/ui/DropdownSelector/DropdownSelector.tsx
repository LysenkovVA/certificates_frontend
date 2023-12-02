import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { Flex, Select, SelectProps, Spin } from "antd";
import { memo, useCallback } from "react";

interface DropdownSelectorType {
    label: string;
    value: string;
}

// Исключаем опции из свойств SelectProps
type DDSelectorProps = Omit<SelectProps, "options" | "children" | "value">;

interface DropdownSelectorProps extends DDSelectorProps {
    reducers: ReducersList;
    value: DropdownSelectorType[];
    onValueChanged: (id: string | undefined) => void;
    isLoading: boolean;
    error?: string;
    options: DropdownSelectorType[];
}

export const DropdownSelector = memo((props: DropdownSelectorProps) => {
    const {
        className,
        reducers,
        options,
        value,
        isLoading,
        onValueChanged,
        error,
        ...otherProps
    } = props;

    const onChange = useCallback(
        (value: DropdownSelectorType[]) => {
            const ddt = value as unknown as DropdownSelectorType;
            if (ddt) {
                onValueChanged(ddt.value);
            } else {
                onValueChanged(undefined);
            }
        },
        [onValueChanged],
    );

    const onClear = useCallback(() => {
        onValueChanged(undefined);
    }, [onValueChanged]);

    const disabled = useCallback(() => {
        if (isLoading) {
            return true;
        }

        if (error) {
            return true;
        }

        return false;
    }, [error, isLoading]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Flex vertical gap={8}>
                <Select
                    showSearch
                    allowClear={true}
                    labelInValue
                    virtual={false}
                    // Без этого поиск не показывал найдненное
                    filterOption={(inputValue, option) =>
                        option!
                            .label!.toLocaleString()
                            .toLowerCase()
                            .includes(inputValue.toLowerCase())
                    }
                    options={options}
                    notFoundContent={isLoading ? <Spin size="small" /> : null}
                    value={value}
                    onChange={onChange}
                    onClear={onClear}
                    loading={isLoading}
                    disabled={disabled()}
                    placeholder={error}
                    {...otherProps}
                />
                {/*{error && (*/}
                {/*    <Typography.Text type={"danger"}>{error}</Typography.Text>*/}
                {/*)}*/}
            </Flex>
        </DynamicModuleLoader>
    );
});
