import { ChangeEvent } from 'react';
import { ISearchBarProps } from '../../interface/ISearchBar';

export const SearchBar: React.FC<ISearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-full mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search..."
        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
  );
};
