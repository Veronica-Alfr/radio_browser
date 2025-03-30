import { useState } from "react";
import { useRadiosCompact } from "../hooks/useRadios";
import { RadioCompactContext } from "./createContext";
import { useStationFilter } from "../hooks/useStationFilter";

export const RadioCompactProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const { data, isLoading, isError } = useRadiosCompact({ limit: 100 });

  const paginatedStations = useStationFilter(data?.stations || [], searchTerm, currentPage * itemsPerPage, itemsPerPage);

  return (
    <RadioCompactContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        currentPage,
        setCurrentPage,
        paginatedStations,
        isLoading,
        isError,
        totalItems: data?.totalItems || 100,
      }}
    >
      {children}
    </RadioCompactContext.Provider>
  );
};