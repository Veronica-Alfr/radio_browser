import { useState } from 'react';
import { useRadioContext } from '../hooks/useRadiosContext';
import { RadioCard } from '../components/radio/RadioCard';
import { Pagination } from '../components/pagination/Pagination';
import { HamburgerMenu } from '../components/navigation/HamburgerMenu';
import { SearchBar } from '../components/search/SearchBar';
import { useStationFilter } from '../hooks/useStationFilter';

const FAVORITES_PER_PAGE = 10;

export const FavoriteRadioList = () => {
  const { favorites } = useRadioContext();
  const [currentOffset, setCurrentOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const paginatedFavorites = useStationFilter(
    favorites,
    searchTerm,
    currentOffset,
    FAVORITES_PER_PAGE
  );

  return (
    <div className="relative min-h-screen container mx-auto p-6 flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
        <div className="mt-1">
          <HamburgerMenu />
        </div>
        
        <div className="flex-grow w-full text-center mt-4 sm:mt-0">
          <h1 className="text-4xl font-bold">Favorite Stations</h1>
          <h2 className="text-lg mt-2 text-gray-600 italic">
            {paginatedFavorites.length === 0
              ? searchTerm
                ? "No stations match your search"
                : "You haven't favorited any stations yet"
              : `Listen to your favorite stations anytime!`}
          </h2>
        </div>
        
        <div className="w-10 sm:w-0"></div>
      </div>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {paginatedFavorites.map((station) => (
          <div key={station.stationuuid} className="w-full">
            <RadioCard radio={station} isEditable />
          </div>
        ))}
      </div>

      {favorites.length > FAVORITES_PER_PAGE && (
        <Pagination
          currentOffset={currentOffset}
          limit={FAVORITES_PER_PAGE}
          totalItems={favorites.length}
          isLoading={false}
          onChange={setCurrentOffset}
        />
      )}
    </div>
  );
};