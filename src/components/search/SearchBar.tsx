import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { ISearchBar } from '../../interface/ISearchBar';

export const SearchBar: React.FC<ISearchBar> = ({searchTerm, setSearchTerm, placeholder = "Search..." }) => {
  const [inputValue, setInputValue] = useState(searchTerm);
  const debouncedSearchTerm = useDebounce(inputValue, 300);

  useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchTerm]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="w-full mb-4">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full text-black p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
  );
};