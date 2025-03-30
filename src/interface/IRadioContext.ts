import React from "react";
import { IRadioStation } from "./IRadio";

export interface IRadioCompactContext {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  paginatedStations: IRadioStation[];
  isLoading: boolean;
  isError: boolean;
  totalItems: number;
}

export interface IRadioContext extends IRadioCompactContext {
  currentStation: IRadioStation | null;
  favorites: IRadioStation[];
  isPlaying: boolean;
  togglePlay: (station: IRadioStation) => void;
  toggleFavorite: (station: IRadioStation) => void;
}