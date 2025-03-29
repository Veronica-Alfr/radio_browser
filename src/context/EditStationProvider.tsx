import React, { useState, useEffect } from 'react';
import { EditedStationsContext } from './createContext';

export const EditRadioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [editedStations, setEditedStations] = useState<Record<string, string>>({});

  useEffect(() => {
    const storedEdits = localStorage.getItem('editedStations');
    if (storedEdits) {
      setEditedStations(JSON.parse(storedEdits));
    }
  }, []);

  const editStationName = (stationuuid: string, newName: string) => {
    const updatedStations = { ...editedStations, [stationuuid]: newName };
    setEditedStations(updatedStations);
    localStorage.setItem('editedStations', JSON.stringify(updatedStations));
  };

  return (
    <EditedStationsContext.Provider value={{ editedStations, editStationName }}>
      {children}
    </EditedStationsContext.Provider>
  );
};
