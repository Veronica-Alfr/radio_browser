import { IRadioCard } from "../interface/IRadio";

export const RadioCard = ({radio}: IRadioCard) => {
  return (
    <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        {radio.favicon && (
          <img 
            src={radio.favicon} 
            alt={radio.name}
            loading="lazy"
            className="w-12 h-12 object-cover rounded"
          />
        )}
        <div className="flex-1">
          <h3 className="font-bold">{radio.name}</h3>
          <p className="text-sm text-gray-600">
            {radio.country}
          </p>
        </div>
        <button className="px-3 py-1 bg-blue-500 text-white rounded">
          Play
        </button>
      </div>
    </div>
  );
};
