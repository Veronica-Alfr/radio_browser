import { useState, useEffect } from 'react';
import { useRadioContext } from '../hooks/useRadiosContext';
import { RadioCard } from '../components/radio/RadioCard';
import { Pagination } from '../components/pagination/Pagination';
import { HamburgerMenu } from '../components/navigation/HamburgerMenu';
// import { useQueryClient } from '@tanstack/react-query';
// import { fetchRadioOneThousand } from '../api/radioListRequest';

const FAVORITES_PER_PAGE = 10;

export const FavoriteRadioList = () => {
  const { favorites } = useRadioContext();
  const [currentOffset, setCurrentOffset] = useState(0);
  // const queryClient = useQueryClient();

  // useEffect(() => {
  //   queryClient.prefetchQuery({
  //     queryKey: ['radios-compact'],
  //     queryFn: () => fetchRadioOneThousand({ limit: 100, offset: 0 }),
  //   });
  // }, [queryClient]);

  const paginatedFavorites = favorites.slice(
    currentOffset,
    currentOffset + FAVORITES_PER_PAGE
  );

  return (
    <div className="relative container mx-auto p-4">
      <HamburgerMenu />

      <h1 className="text-3xl text-center font-bold mb-2">Favorite Stations</h1>
      <h2 className="text-lg text-center text-gray-600 italic mb-8">
        {favorites.length === 0
          ? "You haven't favorited any stations yet"
          : `Listen your favorite stations when you want!`}
      </h2>

      <div className="space-y-4 mb-8">
        {paginatedFavorites.map((station) => (
          <RadioCard key={station.stationuuid} radio={station} />
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
