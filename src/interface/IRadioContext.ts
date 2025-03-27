import { IRadioStation } from "./IRadio";

export interface IRadioContext {
  currentStation: IRadioStation | null;
  favorites: IRadioStation[];
  isPlaying: boolean;
  togglePlay: (station: IRadioStation) => void;
  toggleFavorite: (station: IRadioStation) => void;
}