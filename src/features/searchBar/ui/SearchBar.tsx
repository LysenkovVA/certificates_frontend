import Search from "antd/lib/input/Search";
import { memo } from "react";

interface SearchBarProps {
    className?: string;
    searchQuery: string;
    onSearch?: (value: string | undefined) => void;
}

export const SearchBar = memo((props: SearchBarProps) => {
    const { className, searchQuery, onSearch } = props;

    return (
        <Search
            placeholder={"Введите текст..."}
            value={searchQuery}
            onChange={(e) => onSearch?.(e.target.value)}
        />
    );
});
