import { createContext } from 'react';
import { IRadioContext } from '../interface/IRadioContext';

export const RadioContext = createContext<IRadioContext | undefined>(undefined);