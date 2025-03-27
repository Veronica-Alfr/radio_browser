import { useState } from 'react';
import { useRadioContext } from '../hooks/useRadiosContext';
import { RadioCard } from '../components/radio/RadioCard';
import { Pagination } from '../components/pagination/Pagination';
import { HamburgerMenu } from '../components/navigation/HamburgerMenu';

const FAVORITES_PER_PAGE = 10;

export const FavoriteRadioList = () => {
  const { favorites } = useRadioContext();
  const [currentOffset, setCurrentOffset] = useState(0);

  const paginatedFavorites = favorites.slice(
    currentOffset,
    currentOffset + FAVORITES_PER_PAGE
  );

  return (
    <div className="relative container mx-auto p-4">

      {/* Botão de menu hambúrguer */}
      <HamburgerMenu />

      {/* Conteúdo da lista de favoritos */}
      <h1 className="text-3xl text-center font-bold mb-2">Favorite Stations</h1>
      <h2 className="text-lg text-center text-gray-600 italic mb-8">
        {favorites.length === 0
          ? "You haven't favorited any stations yet"
          : `Your favorite stations`}
      </h2>

      <div className="space-y-4 mb-8">
        {paginatedFavorites.length > 0 &&
          paginatedFavorites.map((station) => (
            <RadioCard key={station.stationuuid} radio={station} />
          ))}
      </div>

      {favorites.length > FAVORITES_PER_PAGE && (
        <Pagination
          currentOffset={currentOffset}
          limit={FAVORITES_PER_PAGE}
          totalItems={favorites.length || 0}
          isLoading={false}
          onChange={setCurrentOffset}
        />
      )}
    </div>
  );
};
