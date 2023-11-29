import { useDebounce } from "@/shared/lib/hooks/useDebounce/useDebounce";
import { Input } from "antd";
import { memo, useCallback } from "react";

interface SearchBarProps {
    className?: string;
    placeholder?: string;
    currentSearchQuery: string;
    onChangeValue: (value: string | undefined) => void;
    searchCallbackForDebounce: (...args: any[]) => void;
}

const DEBOUNCE_DELAY = 1000;

export const SearchBar = memo((props: SearchBarProps) => {
    const {
        className,
        currentSearchQuery,
        onChangeValue,
        placeholder,
        searchCallbackForDebounce,
    } = props;

    const debouncedFetchData = useDebounce(
        searchCallbackForDebounce,
        DEBOUNCE_DELAY,
    );

    const onChange = useCallback(
        (value: string) => {
            console.log("search change value");
            onChangeValue?.(value);
            debouncedFetchData();
        },
        [debouncedFetchData, onChangeValue],
    );

    return (
        <Input
            autoFocus
            allowClear
            id={"searchBarInput"}
            placeholder={placeholder ?? "Поиск..."}
            value={currentSearchQuery}
            onChange={(e) => onChange(e.target.value)}
        />
    );
});
