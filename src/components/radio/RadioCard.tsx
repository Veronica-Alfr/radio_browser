import { FaPlay, FaPause } from "react-icons/fa6";
import { RiHeartAddFill, RiHeartAddLine, RiEdit2Line } from "react-icons/ri";
import { useState, useEffect } from "react";
import { useRadioContext } from "../../hooks/useRadiosContext";
import { IRadioCard } from "../../interface/IRadio";
import { useEditStationsContext } from "../../hooks/useEditStationsContext";

export const RadioCard = ({ radio, isEditable }: IRadioCard & { isEditable?: boolean }) => {
  const { currentStation, isPlaying, favorites, togglePlay, toggleFavorite } = useRadioContext();
  const { editedStations, editStationName } = useEditStationsContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(radio.name);

  useEffect(() => {
    const storedName = editedStations[radio.stationuuid];
    if (storedName) {
      setEditedName(storedName);
    }
  }, [radio.stationuuid, editedStations]);

  const isCurrentPlaying = currentStation?.stationuuid === radio.stationuuid && isPlaying;
  const isFavorite = favorites.some(fav => fav.stationuuid === radio.stationuuid);

  const handleEdit = () => {
    if (isEditing) {
      editStationName(radio.stationuuid, editedName);
    }
    setIsEditing(!isEditing);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      editStationName(radio.stationuuid, editedName);
      setIsEditing(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto border p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white">
      <div className="flex items-center gap-4">
        {radio.favicon && (
          <img 
            src={radio.favicon} 
            alt={`${radio.name} logo`}
            loading="lazy"
            className="w-12 h-12 min-w-[3rem] object-cover rounded"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.png';
            }}
          />
        )}

        <div className="flex-1 min-w-0">
          {isEditable && isEditing ? (
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border rounded p-1 text-gray-900 font-bold"
            />
          ) : (
            <h2 className="font-bold truncate text-gray-900">{editedName || "Unknown Radio"}</h2>
          )}
          <p className="text-sm text-gray-600 truncate">
            {radio.country || radio.language || ""}
          </p>
        </div>

        <div className="flex gap-2">
          {isEditable && (
            <button
              onClick={handleEdit}
              className="p-2 text-lg hover:scale-110 transition-transform"
              aria-label="Edit Station"
            >
              <RiEdit2Line className={isEditing ? "text-green-500" : "text-gray-700"} aria-hidden="true" />
            </button>
          )}

          <button
            onClick={() => toggleFavorite(radio)}
            className="p-2 text-lg hover:scale-110 transition-transform"
            aria-label="Heart Icon"
          >
            {isFavorite ? (
              <RiHeartAddFill className="text-red-500" aria-hidden="true" />
            ) : (
              <RiHeartAddLine className="text-gray-700" aria-hidden="true" />
            )}
          </button>

          <button
            onClick={() => togglePlay(radio)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={isCurrentPlaying ? 'Pause radio' : 'Play radio'}
          >
            {isCurrentPlaying ? (
              <FaPause className="text-gray-900 w-5 h-5" aria-hidden="true" />
            ) : (
              <FaPlay className="text-gray-900 w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
