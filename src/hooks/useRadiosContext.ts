import { useContext } from 'react';
import { RadioContext, RadioCompactContext } from '../context/createContext';

export const useRadioContext = () => {
  const context = useContext(RadioContext);
  
  if (!context) {
    throw new Error('useRadioContext must be used within a RadioProvider');
  }

  return context;
};

export const useRadioCompactContext = () => {
  const context = useContext(RadioCompactContext);
  if (!context) {
    throw new Error('');
  }

  return context;
};