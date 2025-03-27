import { RiHeartAddFill, RiHeartAddLine } from "react-icons/ri";
import { useRadioContext } from "../../hooks/useRadiosContext";
import { IRadioCard } from "../../interface/IRadio";

export const RadioCardCompact = ({ radio }: IRadioCard) => {
  const { favorites, toggleFavorite } = useRadioContext();
  const isFavorite = favorites.some(fav => fav.stationuuid === radio.stationuuid);

  return (
    <div className="w-full max-w-sm mx-auto border p-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-white">
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-semibold truncate text-gray-900">{radio.name || radio.country || radio.language || "Unknown Radio"}</h2>
        </div>

        <button
          onClick={() => toggleFavorite(radio)}
          className="p-1 text-lg hover:scale-110 transition-transform"
          aria-label="Heart Icon"
        >
          {isFavorite ? (
            <RiHeartAddFill className="text-red-500" aria-hidden="true" />
          ) : (
            <RiHeartAddLine className="text-gray-700" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
};
