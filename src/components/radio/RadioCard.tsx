import { FaPlay, FaPause } from "react-icons/fa6";
import { RiHeartAddFill, RiHeartAddLine } from "react-icons/ri";
import { useRadioContext } from "../../hooks/useRadiosContext";
import { IRadioCard } from "../../interface/IRadio";

export const RadioCard = ({ radio }: IRadioCard) => {
  const { currentStation, isPlaying, favorites, togglePlay, toggleFavorite } = useRadioContext();

  const isCurrentPlaying = currentStation?.stationuuid === radio.stationuuid && isPlaying;
  const isFavorite = favorites.some(fav => fav.stationuuid === radio.stationuuid);

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
          <h2 className="font-bold truncate text-gray-900">{radio.name || "Unknown Radio"}</h2>
          <p className="text-sm text-gray-600 truncate">
          {radio.country || radio.language || ""}
          </p>
        </div>

        <div className="flex gap-2">
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
