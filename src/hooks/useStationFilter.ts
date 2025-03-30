import { useMemo } from 'react';
import { IRadioStation } from '../interface/IRadio';

// export const useStationFilter = (stations: IRadioStation[], searchTerm: string) => {
//   return useMemo(() => {
//     if (!stations) return [];
//     return searchTerm
//       ? stations.filter((station: IRadioStation) =>
//           station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           station.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           station.language.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       : stations;
//   }, [stations, searchTerm]);
// };

export const useStationFilter = (stations: IRadioStation[], searchTerm: string, 
  currentOffset: number, itemsPerPage: number) => {
  return useMemo(() => {
    if (!stations) return [];

    const filteredStations = searchTerm
      ? stations.filter((station: IRadioStation) =>
          station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          station.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
          station.language.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : stations;

    return filteredStations.slice(
      currentOffset,
      currentOffset + itemsPerPage
    );
  }, [stations, searchTerm, currentOffset, itemsPerPage]);
};