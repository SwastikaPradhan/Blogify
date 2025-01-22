import { useState } from "react";

interface SearchBarProps {
    onSearch: (value: string) => void;

}
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchTerm(value);
        onSearch(value);
    };
    return (
        <div className="realtive shadow-sm w-full max-w-md mx-auto">
            <div className="absolute insert-y-0 left-0 flex items-center pl-4">
                <svg className="w-4 h-4 text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path

                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"

                    />
                </svg>

            </div>
            <input
                type="search"
                className="block w-full py-2 pl-10 pr-4 text-sm text-gray-900 rounded-lg border border-gray-300 focus:outline-none"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                required
            />
        </div>
    )
}
export default SearchBar;