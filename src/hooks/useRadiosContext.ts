import { useContext } from 'react';
import { RadioContext } from '../context/createContext';

export const useRadioContext = () => {
  const context = useContext(RadioContext);
  
  if (context === undefined) {
    throw new Error('useRadioContext must be used within a RadioProvider');
  }

  return context;
};