import { RiHeartAddFill, RiHeartAddLine } from "react-icons/ri";
import { useRadioContext } from "../../hooks/useRadiosContext";
import { IRadioCard } from "../../interface/IRadio";

export const RadioCardCompact = ({ radio }: IRadioCard) => {
  const { favorites, toggleFavorite } = useRadioContext();
  const isFavorite = favorites.some(fav => fav.stationuuid === radio.stationuuid);

  const truncateText = (text: string | undefined | null) => {
    if (!text || text.trim().length === 0) return "Unknown Radio";
    return text.length > 25 ? `${text.substring(0, 25)}...` : text;
  };

  const displayText = truncateText(radio.name);

  return (
    <div className="w-full h-[50px] min-h-[50px] max-h-[50px] flex items-center border p-4 mb-2 rounded-lg bg-white">
      <div className="flex items-center justify-between w-full">
        <div className="flex-1 min-w-0">
          <h2 
            className="text-sm font-semibold truncate text-gray-900"
            title={displayText}
          >
            {displayText}
          </h2>
        </div>

        <button
          onClick={() => toggleFavorite(radio)}
          className="p-1 text-lg hover:scale-110 transition-transform flex-shrink-0"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? (
            <RiHeartAddFill className="text-red-500" />
          ) : (
            <RiHeartAddLine className="text-gray-700" />
          )}
        </button>
      </div>
    </div>
  );
};
