import { Input } from "antd";
import { memo } from "react";

interface SearchBarProps {
    className?: string;
    placeholder?: string;
    searchQuery: string;
    onSearch?: (value: string | undefined) => void;
}

export const SearchBar = memo((props: SearchBarProps) => {
    const { className, searchQuery, onSearch, placeholder } = props;

    return (
        <Input
            autoFocus
            id={"searchBarInput"}
            placeholder={placeholder ?? "Поиск..."}
            value={searchQuery}
            onChange={(e) => onSearch?.(e.target.value)}
        />
    );
});
