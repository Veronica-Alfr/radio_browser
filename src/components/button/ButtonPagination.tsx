import React from 'react';
import { IButtonEnumeratePage } from '../../interface/IButtonEnumeratePage';

export const ButtonPagination: React.FC<IButtonEnumeratePage> = ({ isSmallScreen, isActive, children, ...props }) => {
  return (
    <button
      {...props}
      className={`flex items-center justify-center rounded border transition-colors
        ${isActive ? 'bg-black text-white border-black' : 'border-gray-700 bg-gray-800 text-white hover:bg-gray-700'}
        ${
          isSmallScreen 
            ? 'text-xs px-1.5 py-0.5 min-w-[24px] h-6'
            : 'text-xs px-2 py-0.5 min-w-[30px] h-8'
        }
        disabled:opacity-40`}
    >
      {children}
    </button>
  );
};

// export default ButtonPagination;
