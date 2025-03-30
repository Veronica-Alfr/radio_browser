import radioIcon from '../../assets/images/radio-svgrepo-com.svg';

export const LoadingCard: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto border p-6 rounded-xl shadow-sm bg-white animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 min-w-[3rem] bg-gray-300 rounded flex items-center justify-center">
          <img
            src={radioIcon}
            alt="Loading icon"
            className="w-8 h-8 opacity-30"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};