import React, { useEffect, useState } from 'react';
import { IRadioProviderProps, IRadioStation } from '../interface/IRadio';
import { RadioContext } from './createContext';

let audio: HTMLAudioElement | null = null;
const FAVORITES_KEY = 'radio_favorites';

export const RadioProvider: React.FC<IRadioProviderProps> = ({ children }) => {
  const [currentStation, setCurrentStation] = useState<IRadioStation | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState<IRadioStation[]>(() => {
  const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const togglePlay = (station: IRadioStation) => {
    if (currentStation?.stationuuid === station.stationuuid) {
      if (audio) {
        if (isPlaying) {
          audio.pause();
        } else {
          audio.play();
        }
        setIsPlaying(!isPlaying);
      }
    } else {
      if (audio) {
        audio.pause();
      }

      setCurrentStation(station);
      audio = new Audio(station.url);
      audio.play();
      setIsPlaying(true);
    }
  };

  const toggleFavorite = (station: IRadioStation) => {
    setFavorites((prev) =>
      prev.some(fav => fav.stationuuid === station.stationuuid)
        ? prev.filter(fav => fav.stationuuid !== station.stationuuid)
        : [...prev, station]
    );
  };

  useEffect(() => {
      return () => {
        if (audio) {
          audio.pause();
        }
      };
    }, []);

  return (
    <RadioContext.Provider value={{ currentStation, isPlaying, togglePlay, favorites, toggleFavorite }}>
      {children}
    </RadioContext.Provider>
  );
};
